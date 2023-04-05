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
  padding-left: 2%;
  padding-right: 2%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 10px;
  background-color: lavender;
  transition: all 0.3s;
`;

const Buttons = styled.div`
  display: flex;
`;

const WrapButtonMore = styled.div`
  width: 50px;
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
      <WrapButtonMore>
        <ButtonMore
          activeGroup={groupData.isActive}
          onClick={() => dispatch(setActiveGroup(groupData.id))}
        />
      </WrapButtonMore>

      {isRedactGroup ? (
        <InputGroup className=" w-75 ">
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
          <h3 className=" ms-3 "> {groupData.groupName} </h3>
          <Buttons>
            <Button
              className=" mx-1"
              variant="warning"
              onClick={() => setIsRedactGroup(!isRedactGroup)}
            >
              Edit
            </Button>
            <Button
              className=" mx-1"
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
