import React, { useEffect, useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseLectures, getCourseLectures } from '../../Redux/Slices/LectureSlice';

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state1 = useLocation();
  const state = state1.state;
  console.log(state);


  const { lectures } = useSelector((state) => state?.lectures);


  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);


  function onLectureDelete(courseId, lectureId) {
    console.log(courseId,lectureId);
    
    dispatch(deleteCourseLectures({ courseId: courseId,  lectureId: lectureId }));
    dispatch(getCourseLectures(courseId));

  }


  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id))
    console.log(state._id);
    
  }, [])
 

  return (
    <HomeLayout>
      <div className='flex flex-col gap-10 justify-center min-h-[90vh] py-10 text-white mx-'>
        <div className='text-center text-2xl font-semibold text-yellow-500'>
          CourseName : {state?.title}
        </div>
        <div className='flex justify-center gap-10 w-full'>
          {/* Left section for playing video */}
          <div className='w-2/3 flex ml-20 flex-col gap-5 shadow-[0_0_10px_black]'>
            <video
              src={lectures && lectures[currentVideo]?.video?.secure_url}
              className='object-fill rounded-tl-lg rounded-tr-lg w-full'
              controls
              muted
              controlsList='nodownload'
            >
            </video>
            <div>
              <h1>
                <span className='text-yellow-500'>
                  Title : {" "}
                </span>
                {lectures[currentVideo]?.title}
              </h1>
              <p>
                <span className='text-yellow-500'>
                  Description : {" "}
                </span>
                {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>
          {/* Right section for lectures */}
          <ul className='w-1/3 mr-10 p-2 rounded-lg shadow-[0_0_10px_black] space-y-4'>
            <li className='font-semibold text-xl text-yellow-500 flex items-center justify-between'>
              <p>Lecture Lists</p>
              {role === "ADMIN" && (
                <button className='w-[10rem] bg-green-500 text-black  hover:bg-green-600 duration-300 bottom-0  px-0.5 py-1 rounded-md font-semibold text-sm cursor-pointer'>
                  Add New Lecture
                </button>
              )}
            </li>
            {
              lectures &&
              lectures.map((lecture, idx) => {
                return <li className='space-y-2 ' key={lecture._id}>
                  <p className='cursor-pointer' onClick={()=>setCurrentVideo(idx)}>
                    <span>
                      {" "} Lecture {idx + 1} : {" "}
                    </span>
                    {lecture.title}
                  </p>
                  {role === "ADMIN" && (
                    <button onClick={onLectureDelete(state._id,lecture._id)} className='w-[8rem] bg-red-500 text-black font-semibold py-1 rounded-lg hover:bg-red-600 duration-300 bottom-0 cursor-pointer'>
                      Delete Lecture
                    </button>
                  )}
                </li>
              }
              )
            }
          </ul>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Displaylectures
