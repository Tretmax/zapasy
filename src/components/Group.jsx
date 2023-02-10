import { Button } from "bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addGroup,
  deleteGroup,
  deleteItem,
  setEditGroup,
  setEditItem,
  addItem,
  setActiveGroup,
  setNameGroup,
  setCurrentValue,
} from "../redux/slice";
import { store } from "../redux/store";

const Wrap = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2%;
  transition: all 0.3s;
`;

const GroupStyle = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 50px;
  background-color: lavender;
`;
const Buttons = styled.div`
  display: flex;
  width: 10%;
  justify-content: space-evenly;
`;

const ButtonPanel = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const Status = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: red;
`;

const Group = ({groupData}) => {
  console.log(groupData)
  // const data = useSelector((state) => state.reserve.data);
  const [handlerInput, setInput] = useState("");
  // console.log(handlerInput)
  const dispatch = useDispatch();
  return (
    <GroupStyle>
      <div> ! </div>
      <h3 onClick={() => dispatch(setActiveGroup(groupData.id))}>
        {groupData.isRedactGroup ? (
          <input
            type="text"
            placeholder={groupData.groupName}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          groupData.groupName
        )}
      </h3>

      {groupData.isRedactGroup ? (
        <Buttons>
          <button
            onClick={() =>
              dispatch(
                setNameGroup({
                  newName: handlerInput,
                  groupId: groupData.id,
                })
              )
            }
          >
            Save
          </button>
          <button onClick={() => dispatch(setEditGroup(groupData.id))}>
            Cancel
          </button>
        </Buttons>
      ) : (
        <Buttons>
          <button onClick={() => dispatch(setEditGroup(groupData.id))}>Edit</button>
          <button onClick={() => dispatch(deleteGroup(groupData.id))}>Del</button>
        </Buttons>
      )}
    </GroupStyle>
  );
};
export default Group;
