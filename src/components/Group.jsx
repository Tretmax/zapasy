import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteGroup,
  setActiveGroup,
  setNameGroup,
} from "../redux/sliceReserves";

const GroupStyle = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid black;
  border-radius: 10px;
  background-color: lavender;
  transition: all 0.3s;
`;
const Buttons = styled.div`
  display: flex;
  width: 10%;
  justify-content: space-evenly;
`;

const ButtonMore = styled.div`
  margin-left: 10px;
  width: 0;
  height: 0;

  border-right: ${(props) =>
    !props.activeGroup ? "" : "10px solid  transparent"};
  border-left: ${(props) =>
    !props.activeGroup ? "20px solid grey" : "10px solid transparent"};
  border-top: ${(props) =>
    !props.activeGroup ? "10px solid transparent" : "20px solid grey"};
  border-bottom: ${(props) =>
    !props.activeGroup ? "10px solid transparent" : ""};

  transition: all 0.5s;
`;

const Group = ({ groupData }) => {
  const [handlerInput, setInput] = useState("");
  const dispatch = useDispatch();
  const [isRedactGroup, setIsRedactGroup] = useState(false);
  return (
    <GroupStyle>
      <div className="w-10">
          <ButtonMore
          activeGroup={groupData.isActive}
          onClick={() => dispatch(setActiveGroup(groupData.id))}
        />
      </div>

      {isRedactGroup ? (
        <InputGroup className="mb-3 w-50">
          <Form.Control
            type="text"
            defaultValue={groupData.groupName}
            placeholder="Введіть нову назву групи"
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <Button
            variant="outline-success"
            onClick={() => (
              dispatch(
                setNameGroup({
                  newName: handlerInput,
                  groupId: groupData.id,
                })
              ),
              setIsRedactGroup(!isRedactGroup)
            )}
          >
            Save
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setIsRedactGroup(!isRedactGroup)}
          >
            Cancel
          </Button>
        </InputGroup>
      ) : (
        <>
          <h3 className="mb-3 ms-3 w-100"> {groupData.groupName} </h3>
          <Buttons>
            <Button
              variant="warning"
              onClick={() => setIsRedactGroup(!isRedactGroup)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => dispatch(deleteGroup(groupData.id))}
            >
              Del
            </Button>
          </Buttons>
        </>
      )}
    </GroupStyle>
  );
};
export default Group;
