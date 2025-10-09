import { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { login } from '../Redux/Slices/AuthSlice'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const [LoginData,setLoginData] = useState({
        email:'',
        password:'',
    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setLoginData({
            ...LoginData,
            [name]:value
        })
    }

    async function onLogin(e){
        e.preventDefault();
        if(!LoginData.email  || !LoginData.password ){
                toast.error("Please fill all the details")
                return;
        }
        

        // dispatch create account action
        const response = await dispatch(login(LoginData))
        if(response?.payload?.success) navigate('/')
       
        setLoginData({
        email:'',
        password:'',
      })
    }

  return (
    <HomeLayout>
        <div className='flex items-center justify-center h-[100vh]'>
            <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                <h1 className='text-center text-2xl font-bold'>Login Page</h1>
                 <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input
                     type="email"
                     required
                     name='email'
                     id='email'
                     placeholder='Enter your Email'
                     className='bg-transparent px-2 py-1 border'
                     onChange={handleUserInput}
                     value={LoginData.email}
                      />
                 </div>
        
                 <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input
                     type="password"
                     required
                     name='password'
                     placeholder='Enter your Password'
                     className='bg-transparent px-2 py-1 border'
                     id='password'
                     onChange={handleUserInput}
                     value={LoginData.password}
                      />
                 </div>

                 <button type="submit" className='w-full bg-yellow-500 hover:bg-yellow-700 py-2 rounded-lg transition-all ease-in-out duration-300 font-bold cursor-pointer'>
                    Login
                 </button>

                 <p className="text-center">
                    Do not have an account? <Link to='/signup'><span className='text-blue-600'>Register</span></Link>
                 </p>
            </form>
        </div>
    </HomeLayout>
  )
}

export default Login
