import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
  },
  reducers: {
    addBuyList(state, action) {
      state.data = action.payload;
    },
    doCheck(state, action) {
      const target = state.data.findIndex(
        (item) =>
          item.groupId === action.payload.groupId &&
          item.itemId === action.payload.itemId
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

export const { addBuyList, doCheck } = todoSlice.actions;
export default todoSlice.reducer;
