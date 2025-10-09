import { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { BsPersonCircle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { createAccount } from '../Redux/Slices/AuthSlice'
import { isEmail, isValidPassword } from '../Helpers/regexMatcher'

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage,setPreviewImage] = useState("")

    const [signUpData,setSignUpData] = useState({
        fullName:'',
        email:'',
        password:'',
        avatar:''
    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setSignUpData({
            ...signUpData,
            [name]:value
        })
    }

    function getImage(e){
        e.preventDefault();

        // getting the image
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            setSignUpData({
                ...signUpData,
                avatar:uploadedImage
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load',function(){
                console.log(this.result);
                setPreviewImage(this.result)
            })
            
            
        }
    }

    async function createNewAccount(e){
        e.preventDefault();
        if(!signUpData.email || !signUpData.fullName || !signUpData.password || !signUpData.avatar){
                toast.error("Please fill all the details")
                return;
        }
        if(signUpData.fullName.length < 3){
            toast.error("Name should be at least of 3 characters")
            return
        }
        if(!isEmail(signUpData.email)){
            toast.error("Invalid email id")
            return
        }

        // if(!isValidPassword(signUpData.password)){
        //     toast.error("Password should be 6 to 16 character long with at least a number and a special character")
        //     return;
        // }
        const formData = new FormData();
        formData.append("fullName",signUpData.fullName)
        formData.append("email",signUpData.email)
        formData.append("password",signUpData.password)
        formData.append("avatar",signUpData.avatar)

        // dispatch create account action
        const response = await dispatch(createAccount(formData))
        if(response?.payload?.success) navigate('/')
       
        setSignUpData({
        fullName:'',
        email:'',
        password:'',
        avatar:''
      })
      setPreviewImage("");
    }

  return (
    <HomeLayout>
        <div className='flex items-center justify-center h-[100vh]'>
            <form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                <h1 className='text-center text-2xl font-bold'>Registration Page</h1>

                <label htmlFor="image_uploads" className='cursor-pointer'>
                    {previewImage ?(
                        <img className='w-24 h-24 m-auto rounded-full' src={previewImage} />
                    ):(
                        <BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>
                    )}
                </label>

                <input 
                 onChange={getImage}
                 type="file"
                 className='hidden'
                 id='image_uploads'
                 accept='.jpg, .jpeg, .png, .svg'
                 name='image_uploads'
                 />

                 <div className='flex flex-col gap-1'>
                    <label htmlFor="fullName" className='font-semibold'>Fullname</label>
                    <input
                     type="text"
                     required
                     name='fullName'
                     placeholder='Enter your Fullname'
                     className='bg-transparent px-2 py-1 border'
                     id='fullName'
                     onChange={handleUserInput}
                     value={signUpData.fullName}
                      />
                 </div>

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
                     value={signUpData.email}
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
                     value={signUpData.password}
                      />
                 </div>

                 <button type="submit" className='w-full bg-yellow-500 hover:bg-yellow-700 py-2 rounded-lg transition-all ease-in-out duration-300 font-bold cursor-pointer'>
                    Register
                 </button>

                 <p className="text-center">
                    Already have an account? <Link to='/login'><span className='text-blue-600'>Login</span></Link>
                 </p>
            </form>
        </div>
    </HomeLayout>
  )
}

export default SignUp
