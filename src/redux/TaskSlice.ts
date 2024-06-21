import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Task } from "../vite-env";

interface TaskData {
  task: Task[];
  error: string | null | undefined;
  loading: boolean;
}

const initialState: TaskData = {
  task: [],
  error: null,
  loading: false,
};

export const fetchTask = createAsyncThunk<Task[] | undefined, void>(
  "fetchTask",
  async () => {
    try {
      const response = await axios.get<Task[]>(
        `https://64ad7b00b470006a5ec606ef.mockapi.io/task`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addTask = createAsyncThunk("addTask", async (newTask) => {
  try {

    const response = await axios.post<Task>(
      `https://64ad7b00b470006a5ec606ef.mockapi.io/task`,newTask
      
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasknew: (state, action: PayloadAction<Task>) => {
      state.task.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    //=====fetching all task list==========//
    builder.addCase(fetchTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTask.fulfilled,
      (state, action: PayloadAction<Task[] | undefined>) => {
        if (action.payload) {
          state.loading = false;
          state.task = action.payload;
        }
      }
    );
    builder.addCase(
      fetchTask.rejected,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    //==========adding new task==========//
  },
});

export const {addTasknew} = TaskSlice.actions

export default TaskSlice.reducer;
