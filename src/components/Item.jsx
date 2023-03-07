import { Button, InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  setCurrentValue,
  setTargetValue,
} from "../redux/sliceReserves";

const ItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2%;
  transition: all 0.3s;
`;

const Buttons = styled.div`
  display: flex;
  width: 10%;
  justify-content: space-evenly;
`;

const Status = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${(props) =>
    props.level < 50 ? "red" : props.level < 75 ? "yellow" : "green"};
`;

const Item = ({ itemData, groupId, activeTarget }) => {
  const [handlerInput, setInput] = useState("");
  const [isTargetValueRedact, setTargetValueRedact] = useState(false);
  const [isCurrentValueRedact, setCurrentValueRedact] = useState(false);

  const dispatch = useDispatch();
  const level = Math.floor((itemData.value / itemData.targetValue) * 100);

  return (
    <ItemStyle>
      <p>{itemData.name}</p>
      {activeTarget ? (
        isTargetValueRedact ? (
          <>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                defaultValue={itemData.targetValue}
                placeholder="Введіть цільове значення"
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <Button
                variant="outline-success"
                onClick={() => {
                  dispatch(
                    setTargetValue({
                      newTargetValue: handlerInput,
                      groupId: groupId,
                      itemId: itemData.id,
                    })
                  );
                  setTargetValueRedact(false);
                }}
              >
                Save
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setTargetValueRedact(false)}
              >
                Cancel
              </Button>
            </InputGroup>
          </>
        ) : (
          <>
            {" "}
            <p>{itemData.targetValue}</p>
            <Button
              variant="secondary"
              onClick={() => setTargetValueRedact(true)}
            >
              Edit
            </Button>
          </>
        )
      ) : (
        ""
      )}

      <p>
        {isCurrentValueRedact ? (
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              defaultValue={itemData.value}
              placeholder="Введіть поточне значення"
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <Button
              variant="outline-success"
              onClick={() => {
                dispatch(
                  setCurrentValue({
                    newValue: handlerInput,
                    groupId: groupId,
                    itemId: itemData.id,
                  })
                );
                setCurrentValueRedact(false);
              }}
            >
              Save
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setCurrentValueRedact(false)}
            >
              Cancel
            </Button>
          </InputGroup>
        ) : (
          itemData.value
        )}{" "}
        {itemData.etc}
      </p>
      <Status level={level}>{level}% </Status>
      {isCurrentValueRedact ? (
        ''
      ) : (
        <Buttons>
          <Button variant="warning" onClick={() => setCurrentValueRedact(true)}>
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              dispatch(
                deleteItem({
                  itemId: itemData.id,
                  groupId: groupId,
                })
              )
            }
          >
            Del
          </Button>
        </Buttons>
      )}
    </ItemStyle>
  );
};

export default Item;
