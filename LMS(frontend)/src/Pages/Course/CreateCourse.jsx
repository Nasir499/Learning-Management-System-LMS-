import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import { createNewCourse } from "../../Redux/Slices/CourseSlice"
import HomeLayout from "../../Layouts/HomeLayout"
import {  AiOutlineArrowLeft } from "react-icons/ai"

function CreateCourse() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput,setUserInput] = useState({
        title:"",
        category:"",
        createdBy:"",
        description:"",
        thumbnail:null,
        previewImage:""
    })
    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const reader = new FileReader();
            reader.readAsDataURL(uploadedImage);
            reader.addEventListener("load", () => {
                setUserInput({
                    ...userInput,
                    thumbnail: uploadedImage,
                    previewImage: reader.result
                });
            });
        }
    }

    function handleUserInput(e){
        const { name, value } = e.target;
        setUserInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.title || !userInput.category || !userInput.createdBy || !userInput.description || !userInput.thumbnail) {
            // Handle form validation error
            toast.error("Please fill in all fields");
            return;
        }
        // Dispatch the create course action
        const response = await dispatch(createNewCourse(userInput));
        if (response?.payload?.success) {
            toast.success("Course created successfully");
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            });
            navigate('/courses');
        }
    }
  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form
            noValidate
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
            >

                <Link onClick={()=>navigate(-1)} className="absolute top-6 left-4 link cursor-pointer text-accent ">
                    <AiOutlineArrowLeft/>
                </Link>

                <h1 className="text-2xl font-bold text-center">
                    Create New Course
                </h1>

                <main className="grid grid-cols-2 gap-x-10">
                    <div className="gap-y-6">
                        <div>
                            <label 
                            htmlFor="image_uploads" 
                            className="cursor-pointer"
                            >
                                {  userInput.previewImage ? (
                                    <img 
                                        src={userInput.previewImage} 
                                        alt="Preview"
                                        className="w-full h-44 m-auto border object-cover"
                                           />
                                    ) : (
                                        <div className="w-full h-44 m-auto flext justify-center items-center border">
                                            <h1 className="font-bold text-lg">Upload Image</h1>
                                        </div>
                                    )
                                      }
                            </label>

                            <input 
                              type="file" 
                              className="hidden"
                              id="image_uploads"
                              accept=".jpg, .jpeg, .png"
                              name="image_uploads"
                              onChange={handleImageUpload}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold " htmlFor="title" >
                                      Course Title
                                </label>
                                <input 
                                type="text" 
                                required
                                name="title"
                                id="title"
                                placeholder="Enter course title"
                                className="bg-transparent px-2 py-1 border "
                                value={userInput.title}
                                onChange={handleUserInput}
                                />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold " htmlFor="createdBy" >
                                      Instructor
                                </label>
                                <input 
                                type="text" 
                                required
                                name="createdBy"
                                id="createdBy"
                                placeholder="Enter course Instructor"
                                className="bg-transparent px-2 py-1 border "
                                value={userInput.createdBy}
                                onChange={handleUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold " htmlFor="category" >
                                      Course Category
                                </label>
                                <input 
                                type="text" 
                                required
                                name="category"
                                id="category"
                                placeholder="Enter course Instructor"
                                className="bg-transparent px-2 py-1 border "
                                value={userInput.category}
                                onChange={handleUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold " htmlFor="description" >
                                      Course Description
                                </label>
                                <textarea 
                                type="text" 
                                required
                                name="description"
                                id="description"
                                placeholder="Enter course Instructor"
                                className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border "
                                value={userInput.description}
                                onChange={handleUserInput}
                                />
                            </div>
                    </div>

                </main>
                
                <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    Create Course
                </button>
              </form>
        </div>
    </HomeLayout>
  )
}

export default CreateCourse
