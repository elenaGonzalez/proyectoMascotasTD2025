import { configureStore } from '@reduxjs/toolkit'
import publicacionesReducer from "./publicacionesSlice";
import usuarioReducer from "./usuarioSlice";
import adminReducer from "./adminSlice";


const store = configureStore({
  reducer:{
    publicaciones : publicacionesReducer,
    usuario : usuarioReducer,
    admin : adminReducer,
  },
  devTools: true,
})

export default store;