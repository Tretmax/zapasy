import { configureStore } from '@reduxjs/toolkit';
import reservReducer from './sliceReserves'
import todoReducer from './sliceTodo'


export const store = configureStore({
  reducer :{
    reserve : reservReducer,
    todo : todoReducer}
});
