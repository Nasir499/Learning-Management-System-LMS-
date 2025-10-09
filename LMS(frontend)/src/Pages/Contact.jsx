import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout"
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";
import axios from "axios";
function Contact() {
  const [userInput,setUserInput] = useState({
    name: "",
    email: "",
    message: ""
  })  

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    
    setUserInput({
      ...userInput,
      [name]: value
    })
  }
  const onFormSubmit =async(e) => {
    e.preventDefault();
    if(!userInput.name || !userInput.email || !userInput.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // if(isEmail(userInput.email)){
    //   toast.error("Please enter a valid email address");
    //   return
    // }
    try {
      const response =  axios.post("http://localhost:8000/api/v1/contact", userInput)
      toast.promise(response, {
        loading: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message"
      })
      const contactResponse = await response;
      if(contactResponse?.data?.success){
        setUserInput({
          name: "",
          email: "",
          message: ""
        })
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later."); 
    }
  }
  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form className="flex flex-col items-center justify-center gap-2 p-5 rounded-md  text-white shadow-[0_0_10px_black] w-[22rem]" noValidate onSubmit={onFormSubmit}>
                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">Name</label>
                        <input 
                         type="text" 
                         className="bg-transparent border px-2 py-1 rounded-sm " 
                         id="name"
                          name="name" 
                          placeholder="Enter your name" 
                          onChange={handleInputChange}
                          value={userInput.name}
                          />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">Email</label>
                        <input 
                         type="email" 
                         className="bg-transparent border px-2 py-1 rounded-sm " 
                         id="email"
                         name="email"
                         placeholder="Enter your email" 
                         onChange={handleInputChange}
                         value={userInput.email}
                          />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">Message</label>
                        <textarea 
                         type="text" 
                         className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40" 
                         id="message"
                         name="message"
                         placeholder="Enter your message" 
                         onChange={handleInputChange}
                         value={userInput.message}
                          />
                    </div>

                    < button type="submit"
                      className="w-full bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 text-lg cursor-pointer"
                    >
                        Submit 
                    </button>
            </form>
        </div>
    </HomeLayout>
  )
}

export default Contact
