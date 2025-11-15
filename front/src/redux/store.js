import { configureStore } from '@reduxjs/toolkit'
import publicacionesReducer from "./publicacionesSlice";


const store = configureStore({
  reducer:{
    publicaciones : publicacionesReducer
  },
  devTools: true,
})

export default store;