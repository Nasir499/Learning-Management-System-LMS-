import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getProfile } from "../../Redux/Slices/AuthSlice";

function Profile() {
  const dispatch = useDispatch();
   const userData = useSelector((state)=> state?.auth?.data);

   useEffect(() => {
       dispatch(getProfile());
   }, [dispatch]);

  return (
    <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap4 rounded-lg p-4 text-white w-130 shadow-[0_0_10px_black]">
                   <img 
                        src={userData?.avatar?.secure_url} 
                        className="w-40 m-auto rounded-full border-black border"
                    />
                    <h2 className="text-xl font-semibold text-center capitalize">
                            {userData?.fullName}
                    </h2>
                    <div className="grid grid-cols-2">
                        <p>Email:</p><p>{userData?.email}</p>
                        <p>Role:</p><p>{userData?.role}</p>
                        <p>Subscription:</p><p>{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 gap-2">
                        <Link to="/changepassword" className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                          <button>Change Password</button>
                        </Link>
                        <Link to="/user/editprofile" className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                          <button>Edit Profile</button>
                        </Link>
                    </div>
                    {userData?.subscription?.status === 'active' && (
                        <button className="w-full bg-red-600 mt-2 py-2 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold cursor-pointer text-center">
                            Cancel Subscription
                        </button>
                    )}
                </div>
        </div>
    </HomeLayout>
  )
}

export default Profile
