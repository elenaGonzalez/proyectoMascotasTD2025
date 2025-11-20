import { configureStore } from '@reduxjs/toolkit'
import publicacionesReducer from "./publicacionesSlice";
import usuarioReducer from "./usuarioSlice";


const store = configureStore({
  reducer:{
    publicaciones : publicacionesReducer,
    usuario : usuarioReducer,
  },
  devTools: true,
})

export default store;