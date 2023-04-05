import { createSlice } from "@reduxjs/toolkit";
import { data } from "../mocks/data";

const reservSlice = createSlice({
  name: "reserves",
  initialState: {
    data: data,
  },
  reducers: {
    addGroup(state, action) {
      state.data.push({
        id: Math.floor(Math.random() * 100000),
        groupName: action.payload,
        isActive: true,
        items: [],
      });
    },

    addItem(state, action) {
      console.log(action);
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      state.data[currentGroup].items.push({
        id: Math.floor(Math.random() * 10000000),
        name: action.payload.itemName,
        targetValue: action.payload.targetValue,
        etc: action.payload.etc,
        value: action.payload.value,
      });
    },

    setActiveGroup(state, action) {
      const target = state.data.findIndex((item) => item.id === action.payload);
      state.data[target].isActive = !state.data[target].isActive;
    },

    setNameGroup(state, action) {
      const target = state.data.findIndex(
        (item) => item.id === action.payload.groupId
      );
      state.data[target].groupName = action.payload.newName;
      state.data[target].isRedactGroup = !state.data[target].isRedactGroup;
    },

    setTargetValue(state, action) {
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const currentItem = state.data[currentGroup].items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      state.data[currentGroup].items[currentItem].targetValue =
        action.payload.newTargetValue;
      state.data[currentGroup].items[currentItem].isRedactItem =
        !state.data[currentGroup].items[currentItem].isRedactItem;
    },
    setCurrentValue(state, action) {
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const currentItem = state.data[currentGroup].items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      state.data[currentGroup].items[currentItem].value =
        action.payload.newValue;
      state.data[currentGroup].items[currentItem].isRedactItem =
        !state.data[currentGroup].items[currentItem].isRedactItem;
    },
    deleteGroup(state, action) {
      const target = state.data.findIndex(
        (group) => group.id === action.payload
      );
      state.data.splice(target, 1);
    },
    deleteItem(state, action) {
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const currentItem = state.data[currentGroup].items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      state.data[currentGroup].items.splice(currentItem, 1);
    },
    finishBuy(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state.data.forEach((group) => {
          group.items.map((item) => {
            if (item.id === +key) {
              item.value = +item.value + +action.payload[key];
            }
          });
        });
      });
    },
  },
});

export const {
  addGroup,
  addItem,
  deleteGroup,
  deleteItem,
  setActiveGroup,
  setNameGroup,
  setCurrentValue,
  setTargetValue,
  finishBuy,
} = reservSlice.actions;
export default reservSlice.reducer;
