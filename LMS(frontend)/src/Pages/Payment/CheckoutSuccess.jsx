import HomeLayout from '../../Layouts/HomeLayout'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfile } from '../../Redux/Slices/AuthSlice';
import { useEffect } from 'react';

function CheckoutSuccess() {
  const dispatch = useDispatch();
 useEffect(()=>{dispatch(getProfile())})
  return (
    <HomeLayout>
        <div className='min-h-[90vh] flex items-center justify-center text-white'>
                <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] relative rounded-lg'>
                        <h1 className='bg-green-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center'>Payment Successfull</h1>

                        <div className='px-4 flex flex-col items-center justify-center space-y-2'>
                                <div className='text-center space-y-2'>
                                    <h2 className='text-lg font-semibold'>
                                        Welcome to provat kaku pvt limited
                                    </h2>
                                    <p className=''>
                                        Now enjoy your learning
                                    </p>
                                </div>
                                <AiFillCheckCircle className='text-green-500 text-5xl flex items-center justify-center'/>
                        </div>
                        
                        <Link to='/' className='w-4/5 bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center absolute bottom-4'><button>Go to Home</button></Link>
                </div>
        </div>
    </HomeLayout>
  )
}

export default CheckoutSuccess
