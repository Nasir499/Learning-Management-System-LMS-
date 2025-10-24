import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../Redux/Slices/RazorpaySlice';
import toast from 'react-hot-toast';
import HomeLayout from '../../Layouts/HomeLayout';
import { BiRupee } from "react-icons/bi";

function CheckOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorPayKey = useSelector((state) => state?.razorpay?.key);
  // console.log(razorPayKey);
  const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
  // console.log(subscription_id);

  const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
  const userData = useSelector((state) => state?.auth?.data);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  }

  async function handleSubscription(e) {
    e.preventDefault()
    if (!razorPayKey || !subscription_id) {
      toast.error("Something went wrong");
      return
    }

    const options = {
      key: razorPayKey,
      subscription_id: subscription_id,
      name: "Provat kaku Private ltd.",
      description: "Subscription",
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
        console.log(paymentDetails);
        
        toast.success("Payment successfull")

        const res = await dispatch(verifyUserPayment(paymentDetails))
        console.log(res.payload);
        (res?.payload?.success) ? navigate("/checkout/success") : navigate("/checkout/fail")
      },
      theme: {
        color: "#f37254"
      },
      prefill: {
        email: userData.email || "",
        name: userData.fullName || ""
      },
    }
    if (window.Razorpay) {
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    }
    else{
      toast.error("Razorpay SDK failed to load")
    }

  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle())
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <HomeLayout>
      <form
        className='min-h-[90vh] flex items-center justify-center text-white'
        onSubmit={handleSubscription}
      >
        <div className='w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative'>
          <h1 className='bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg'>Subscription Bundle</h1>
          <div className='px-4 space-y-5 text-center'>
            <p className='text-[17px] mt-10'>
              This is a one time payment bundle which includes all the courses in this platform for
              <span className='text-yellow-500'>&nbsp;1 year duration</span>&nbsp;
              All existing and upcoming courses will be available in this bundle.
            </p>
            <p className='flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500'>
              <BiRupee /><span>499</span>only
            </p>
            <div className='text-gray-300'>
              <p>100% refund policy</p>
              <p>* terms and conditions apply</p>
            </div>
            <button
              type='submit'
              className='w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 duration-300 bottom-0 cursor-pointer'
            >
              Subscribe Now
            </button>
          </div>
        </div>

      </form>
    </HomeLayout>
  )
}

export default CheckOut