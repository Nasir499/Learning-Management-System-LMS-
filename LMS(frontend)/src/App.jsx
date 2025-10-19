import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import Notfound from './Pages/Notfound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import CreateCourse from './Pages/Course/CreateCourse'
import RequireAuth from './Components/Auth/RequireAuth'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import CheckOut from './Pages/Payment/CheckOut'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'



function App() {

  return (
  
      <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/courses' element={<CourseList />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/denied' element={<Denied />} />
            <Route path='/course/description' element={<CourseDescription />} />

            <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
                <Route path='/course/create' element={<CreateCourse />} />
            </Route>


            <Route element={<RequireAuth allowedRoles={['ADMIN','USER']} />}>
                <Route path='/user/profile' element={<Profile />} />
                <Route path='/user/editprofile' element={<EditProfile />} />
                <Route path='/checkout' element={<CheckOut />} />
                <Route path='/checkout/success' element={<CheckoutSuccess />} />
            </Route>


            <Route path='*' element={<Notfound />} />


      </Routes>
   
  )
}

export default App
