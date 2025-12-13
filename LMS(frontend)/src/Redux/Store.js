import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice"
import razorpaySliceReducer from "./Slices/RazorpaySlice";
import lectureSliceReducer from "./Slices/LectureSlice"
import statSliceReducer from "./Slices/StatSlice"

const store = configureStore({
  reducer: {
    auth:authSliceReducer,
    course:courseSliceReducer,
    razorpay:razorpaySliceReducer,
    lectures:lectureSliceReducer,
    stat: statSliceReducer
  },
  devTools:true
});
export default store;
