import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteGroup,
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
  const [handlerInput, setInput] = useState("");
  const dispatch = useDispatch();
  const [isRedactGroup,setIsRedactGroup]=useState(false)
  
  return (
    <GroupStyle>
      <div onClick={() => dispatch(setActiveGroup(groupData.id))}> ! </div>
      <h3 >
        {isRedactGroup ? (
          <Form.Control
            type="text"
            placeholder={groupData.groupName}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          groupData.groupName
        )}
      </h3>

      {isRedactGroup ? (
        <Buttons>
          <Button
          variant="success"
            onClick={() =>
             ( dispatch(
                setNameGroup({
                  newName: handlerInput,
                  groupId: groupData.id,
                })
              ), 
              setIsRedactGroup(!isRedactGroup))
            }
          >
            Save
          </Button>
          <Button 
          variant="danger"
          onClick={() => setIsRedactGroup(!isRedactGroup)}>
            Cancel
          </Button>
        </Buttons>
      ) : (
        <Buttons>
          <Button 
          variant="warning"
          onClick={() => setIsRedactGroup(!isRedactGroup)}>Edit</Button>
          <Button 
          variant="danger"
          onClick={() => dispatch(deleteGroup(groupData.id))}>Del</Button>
        </Buttons>
      )}
    </GroupStyle>
  );
};
export default Group;
