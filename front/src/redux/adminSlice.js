import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
   name: "admin",
   initialState: {
    usuarios: [],
    publicaciones : [],
   },
   reducers:{
    setUsuarios: (state, action )=>{
      state.usuarios = action.payload;
    },
    setPublicaciones: (state, action )=>{
        state.publicaciones = action.payload
    },
   }
});

export const {setUsuarios, setPublicaciones} = adminSlice.actions;
export default adminSlice.reducer;