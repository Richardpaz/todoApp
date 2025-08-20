import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../slices/task.slice.jsx"

export const store = configureStore({
  reducer: {
    tarea: taskSlice,
  },
});
