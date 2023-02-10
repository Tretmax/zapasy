import { Button } from "bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteGroup,
  setEditGroup,
  setActiveGroup,
  setNameGroup,
} from "../redux/slice";

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


const Group = ({groupData}) => {
  console.log(groupData)
  const [handlerInput, setInput] = useState("");
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
