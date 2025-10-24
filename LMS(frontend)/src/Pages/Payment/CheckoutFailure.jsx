import HomeLayout from '../../Layouts/HomeLayout'
import { Link } from 'react-router-dom'

function CheckoutFailure() {
  return (
    <HomeLayout>
        <div className='min-h-[90vh] flex items-center justify-center text-white'>
                <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] relative rounded-lg'>
                        <h1 className='bg-red-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center'>Payment Failed</h1>

                        <div className='px-4 flex flex-col items-center justify-center space-y-2'>
                                <div className='text-center space-y-2'>
                                    <h2 className='text-lg font-semibold'>
                                        Oops!! Your payment failed
                                    </h2>
                                    <p>
                                        please try again
                                    </p>
                                </div>
                                {/* <RxCrossCircled className='text-red-500 text-5xl flex items-center justify-center'/> */}
        
                        </div>
                        
                        <Link to='/checkout' className='w-4/5 bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center absolute bottom-4'><button>Try Again</button></Link>
                </div>
        </div>
    </HomeLayout>
  )
}

export default CheckoutFailure
