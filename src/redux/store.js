import { configureStore } from '@reduxjs/toolkit';
import reservReducer from './slice'



export const store = configureStore({
  reducer :{
    reserve : reservReducer},
});
