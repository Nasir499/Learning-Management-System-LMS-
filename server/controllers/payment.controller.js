import { razorpay } from '../server.js';
import User from '../models/user.model.js'
import AppError from '../utils/error.util.js';
import Payment from '../models/payment.model.js';
import crypto from 'crypto';
import { log } from 'console';



const getRazorpayKey = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Razorpay API key",
        key: process.env.RAZORPAY_KEY_ID
    })
}

const buySubscribtion = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("Unauthorized,please login", 401));
        }
        if (user.role === 'ADMIN') {
            return next(new AppError("Admins are not allowed to buy subscriptions", 401));
        }
        const subscription = await razorpay.subscriptions.create({
            customer_notify: 1,
            total_count:12,
            plan_id: process.env.RAZORPAY_PLAN_ID,
            
        })
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Subscription created successfully",
            subscription_id: subscription.id
        });
    } catch (error) {
        next(new AppError("Ho66e na", 500));
    }

}

const verifySubscription = async (req, res, next) => {
    const { id } = req.user;
    const { razorpay_payment_id, razorpay_payment_signature, razorpay_subscription_id } = req.body;
    // console.log(razorpay_subscription_id);
    
    if(!razorpay_payment_id || !razorpay_payment_signature || !razorpay_subscription_id){
        return next(new AppError("Payment details are missing", 500));
    }
    
    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("Unauthorized,please login", 401));
    }

    const subscriptionId = user.subscription.id;
    // console.log(subscriptionId);
    

    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
         .update(`${razorpay_payment_id}|${subscriptionId}`)
        .digest('hex');

   
    if (generatedSignature !== razorpay_payment_signature) {
        console.log(generatedSignature ,razorpay_payment_signature);
        return next(new AppError("Payment not verified", 500));
   }

    await Payment.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature: razorpay_payment_signature,
    });
    user.subscription.status = 'active';
    console.log(user.subscription.status);
    
    await user.save();

    res.status(200).json({
        success: true,
        message: "Subscription verified successfully",
    });
}

const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("Unauthorized,please login", 401));
        }
        if (user.role === 'ADMIN') {
            return next(new AppError("Admins are not allowed to cancel subscriptions", 401));
        }
        const subscriptionId = user.subscription.id;

        const subscription = await razorpay.subscriptions.cancel(subscriptionId);

        user.subscription.status = subscription.status;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscription canceled successfully",
        });
    } catch (error) {
        next(new AppError("Something went wrong", 500));
    }
}

const allPayments = async (req, res, next) => {
    try {
        const { count } = req.query;
        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10
        });
        const payments = await Payment.find({});

        res.status(200).json({
            success: true,
            message: "All payments fetched successfully",
            subscriptions,
            payments
        });
    } catch (error) {
        next(new AppError("Something went wrong", 500));
    }
}

export {
    getRazorpayKey,
    buySubscribtion,
    verifySubscription,
    cancelSubscription,
    allPayments
}

