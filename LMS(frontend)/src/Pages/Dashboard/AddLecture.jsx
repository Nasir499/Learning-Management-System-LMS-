import  { useEffect, useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addCourseLectures } from '../../Redux/Slices/LectureSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';

function AddLecture() {
    const courseDetails = useLocation();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [userInput,setUserInput] = useState({
        id:courseDetails.state._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    });


    function handleInputChange(e){
        const {name,value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function handleVideo(e){
        const video = e.target.files[0];
        const src = window.URL.createObjectURL(video);
        console.log(src);
        
        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:src
        })
    }

    async function onFormSubmit(event){
        event.preventDefault();
        if(!userInput.title || !userInput.description || !userInput.videoSrc) {
            toast.error("Please fill in all fields");
            return;
        }
       const response =  await dispatch(addCourseLectures(userInput));
        if(response?.payload?.success) {
            navigate(-1)
            setUserInput({
        id:courseDetails.id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
       })
        }
    }

    useEffect(()=>{
        if(!courseDetails) navigate("/courses");
    },[])

  return (
    <HomeLayout>
      <div className='min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16'>
            <div className='flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg'>
                <header className='flex items-center justify-center relative'>
                    <button className='absolute left-2 text-xl text-green-500 cursor-pointer' onClick={()=>navigate(-1)}>
                        <AiOutlineArrowLeft/>
                    </button>
                    <h1 className='text-xl text-yellow-500 font-semibold '>Add Lecture</h1>
                </header>
                <form 
                onSubmit={onFormSubmit}
                className='flex flex-col gap-3'
                >
                    <input 
                    type="text" 
                    name='title'
                    onChange={handleInputChange}
                    value={userInput.title}
                    placeholder='Title'
                    className='p-2 rounded-md bg-slate-800'
                    />
                    <textarea 
                    type="text" 
                    name='description'
                    onChange={handleInputChange}
                    value={userInput.description}
                    placeholder='Description'
                    className='p-2 rounded-md bg-slate-800 resize-none h-40 overflow-auto'
                    />
                    {userInput.videoSrc ?(
                        <video
                        src={userInput.videoSrc}
                        controls
                        className='w-full h-50 object-cover'
                        ></video>
                    )
                    :(
                        <div className='h-48 border flex items-center justify-center cursor-pointer'>
                            <label htmlFor="lecture" className='font-semibold text-xl cursor-pointer'>Choose Video</label>
                            <input 
                            onChange={handleVideo} 
                            type="file"
                            className='hidden'
                            name='lecture'
                            id='lecture'
                            />
                        </div>
                    )
                    }
                    <button type='submit' className='p-2 bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300'>Add</button>

                </form>
            </div>
      </div>
    </HomeLayout>
  )
}

export default AddLecture
