import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import  axiosInstance  from "../../Helpers/axiosinstance"

const initialState = {
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonth:{},
    monthlySalesRecords:[]
};


export const getRazorPayId = createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response = await axiosInstance.get("payments/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error("Failed to get Razorpay API key")
    }
})
export const purchaseCourseBundle = createAsyncThunk("/purchase",async()=>{
    try {
        const response = await axiosInstance.post("payments/subscribe");
        console.log(response);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.message || "Failed to subscribe course bundle")
    }
})
export const verifyUserPayment = createAsyncThunk("/payments/verify",async(data)=>{
    try {
        const response = await axiosInstance.post("payments/verify",{
        razorpay_payment_id : data.razorpay_payment_id,
        razorpay_subscription_id : data.razorpay_order_id,
        razorpay_signature :data.razorpay_signature,
        })
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load data")
    }
})
export const getPaymentRecords = createAsyncThunk("/payments/records",async()=>{
    try {
        const response =  axiosInstance.get("payments?.count=100");
        toast.promise(response, {
            loading: "Getting Payment records...",
            success:(data) => {
                return data?.message
            },
            error: "Failed to load payments"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load data")
    }
})
export const cancelCourseBundle = createAsyncThunk("/payments/cancel",async()=>{
    try {
        const response =  axiosInstance.post("payments/unsubscribe");
        toast.promise(response, {
            loading: "Cancelling subscription...",
            success:(data) => {
                return data?.message
            },
            error: "Failed to load payments"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load data")
    }
})








const razorPaySlice = createSlice({
    name: "razorPay",
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key = action.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.error(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecords.fulfilled,(state,action)=>{
            state.allPayments = action?.payload?.allPayments;
            state.finalMonth = action?.payload?.finalMonth;
            state.monthlySalesRecords = action?.payload?.monthlySalesRecords;
        })
        // .addCase(cancelCourseBundle.fulfilled,(state,action)=>{
        //     state.finalMonth = action?.payload?.;
        // })
    }
})

export default razorPaySlice.reducer;


