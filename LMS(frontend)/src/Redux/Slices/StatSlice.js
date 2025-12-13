import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosinstance"
import toast from "react-hot-toast"

const initialSate ={
    allUserCount:0,
    subscribedCount:0
}

export const getStatData = createAsyncThunk("/stat/get",async()=>{
    try {
        const res =  axiosInstance.get("/admin/stats/users")
        toast.promise(res,{
            loading:"Getting Statistics...",
            success:"Statistics loaded successfully",
            error:"Failed to get Statistics"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.res?.data?.message)
    }
})

const statSlice = createSlice({
    name:"stat",
    initialState:initialSate,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getStatData.fulfilled,(state,action)=>{
            state.allUserCount = action?.payload?.allUsersCount
            state.subscribedCount = action?.payload?.subscribedUsersCount
        })

    }
})

export default statSlice.reducer