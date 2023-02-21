import { createSlice } from "@reduxjs/toolkit";
import { todo } from "../mocks/data";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: todo,
  },
  reducers: {
    addbBuyList(state, action) {
      state.data = action.payload;
    },
    doCheck(state, action) {
      const target = state.data.findIndex(
        (item) =>
          item.id === action.payload.groupId &&
          item.name === action.payload.name
      );
      state.data[target].isCheck = !state.data[target].isCheck;
      state.data.sort((a, b) => {
        if (a.isCheck > b.isCheck) {
          return 1;
        }
        if (a.isCheck < b.isCheck) {
          return -1;
        }
        return 0;
      });
    },
  },
});

export const { addbBuyList, doCheck } = todoSlice.actions;
export default todoSlice.reducer;
