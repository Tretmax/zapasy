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
      console.log(action)
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      state.data[currentGroup].items.push({
        name: action.payload.itemName,
        targetValue: action.payload.targetValue,
        etc: action.payload.etc,
        value: action.payload.value,
        isRedactItem: false,
      });
    },

    setActiveGroup(state, action) {
      const target = state.data.findIndex((item) => item.id === action.payload);
      state.data[target].isActive = !state.data[target].isActive;
    },

      setNameGroup(state, action) {
      const target = state.data.findIndex((item) => item.id === action.payload.groupId);
      state.data[target].groupName = action.payload.newName;
      state.data[target].isRedactGroup = !state.data[target].isRedactGroup;
      

    },

    setEditItem(state, action) {
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const currentItem = state.data[currentGroup].items.findIndex(
        (item) => item.name === action.payload.nameItem
      );
      state.data[currentGroup].items[currentItem].isRedactItem =
        !state.data[currentGroup].items[currentItem].isRedactItem;
    },
    setCurrentValue(state, action) {
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const currentItem = state.data[currentGroup].items.findIndex(
        (item) => item.name === action.payload.nameItem
      );
      state.data[currentGroup].items[currentItem].value =action.payload.newValue;
      state.data[currentGroup].items[currentItem].isRedactItem =
        !state.data[currentGroup].items[currentItem].isRedactItem;
        
    },
    deleteGroup(state, action) {
      const target = state.data.findIndex((item) => item.id === action.payload);
      state.data.splice(target, 1);
    },
    deleteItem(state, action) {
      const currentGroup = state.data.findIndex(
        (group) => group.id === action.payload.groupId
      );
      const currentItem = state.data[currentGroup].items.findIndex(
        (item) => item.name === action.payload.nameItem
      );
      state.data[currentGroup].items.splice(currentItem, 1);
    },
  },
});

export const {
  addGroup,
  addItem,
  deleteGroup,
  deleteItem,
  setEditItem,
  setActiveGroup,
  setNameGroup,
  setCurrentValue
} = reservSlice.actions;
export default reservSlice.reducer;
