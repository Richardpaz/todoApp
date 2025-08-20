import { createSlice } from "@reduxjs/toolkit";
const taskSlice = createSlice({
  name: "tarea",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const found = state.find((e) => e.id == action.payload);
      state.splice(state.indexOf(found), 1);
    },
    editTask:(state,action) => {
      const {id,nombre,descripcion,estado} = action.payload 
      const found = state.find((e) => e.id == id);
      found.nombre = nombre
      found.descripcion = descripcion
      found.estado = estado
    }
  },
});

export const { addTask, deleteTask,editTask } = taskSlice.actions;
export default taskSlice.reducer;
