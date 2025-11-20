import { createSlice } from "@reduxjs/toolkit";

const publicacionesSlice = createSlice({
   name: "publicaciones",
   initialState: [],
   reducers:{
    getPublicaciones: (state, action )=>{
        return action.payload;
    }
   }
});


export const {getPublicaciones} = publicacionesSlice.actions;
export default publicacionesSlice.reducer;

