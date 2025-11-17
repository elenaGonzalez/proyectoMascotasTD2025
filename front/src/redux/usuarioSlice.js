import { createSlice } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
   name: "usuario",
   initialState: {},
   reducers:{
    setUsuario: (state, action )=>{
        return action.payload;
    },
     getUsuario: (state, action )=>{
        return state.usuario;
    },
    logoutUsuario: (state, action )=>{
        return action.payload
    },
   }
});

export const {setUsuario, getUsuario, logoutUsuario} = usuarioSlice.actions;
export default usuarioSlice.reducer;