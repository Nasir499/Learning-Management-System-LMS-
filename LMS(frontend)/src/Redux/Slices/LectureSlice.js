import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosinstance"

const initialState = {
    lectures: []
}

export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (cid) => {
    try {
        const response = axiosInstance.get(`/course/${cid}`);
        toast.promise(response, {
            loading: "Getting Lectures...",
            success: "Lectures loaded successfully",
            error: "Failed to get Lectures",
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const addCourseLectures = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);
        const response = axiosInstance.post(`/course/${data.id}`);
        toast.promise(response, {
            loading: "Adding Lectures...",
            success: "Lectures Added successfully",
            error: "Failed to Add Lectures",
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const deleteCourseLectures = createAsyncThunk("/course/lecture/delete", async (data) => {
    try {

        const response = axiosInstance.delete(`/course?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: "Deleting Lectures...",
            success: "Lectures Deleted successfully",
            error: "Failed to delete Lectures",
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


const lectureSlice = createSlice({
    name: "lectures",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
             builder
            .addCase(getCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.lectures
            })
            .addCase(addCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.lectures
            })
            .addCase(deleteCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.course?.lectures
            });
    }
})
export default lectureSlice.reducer;
