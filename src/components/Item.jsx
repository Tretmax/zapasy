import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, setCurrentValue, setTargetValue } from "../redux/sliceReserves";

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
            <Form.Control
              type="number"
              placeholder={itemData.targetValue}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              variant="success"
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
              variant="danger"
              onClick={() => setTargetValueRedact(false)}
            >
              Cancel
            </Button>
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
          <Form.Control
            type="number"
            placeholder={itemData.value}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          itemData.value
        )}{" "}
        {itemData.etc}
      </p>
      <Status level={level}>{level}% </Status>
      {isCurrentValueRedact ? (
        <Buttons>
          <Button
            variant="success"
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
          <Button variant="danger" onClick={() => setCurrentValueRedact(false)}>
            Cancel
          </Button>
        </Buttons>
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
