import {configureStore} from "@reduxjs/toolkit"
import TaskSlice from "./redux/TaskSlice"





const store = configureStore({
    reducer:{
        Task: TaskSlice
    }
})


export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

