import { Button } from "bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, setEditItem, setCurrentValue } from "../redux/slice";

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
  background-color: red;
`;

const Item = ({ itemData, groupId, activeTarget }) => {
  const [handlerInput, setInput] = useState("");
  const dispatch = useDispatch();
  return (
    <ItemStyle>
      <p>{itemData.name}</p>
      {activeTarget ? <p>{itemData.targetValue}</p> : ""}
      <p>
        {itemData.isRedactItem ? (
          <input
            type="text"
            placeholder={itemData.value}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          itemData.value
        )}{" "}
        {itemData.etc}
      </p>
      <Status />
      {itemData.isRedactItem ? (
        <Buttons>
          <button
            onClick={() =>
              dispatch(
                setCurrentValue({
                  newValue: handlerInput,
                  groupId: groupId,
                  nameItem: itemData.name,
                })
              )
            }
          >
            Save
          </button>
          <button
            onClick={() =>
              dispatch(
                setEditItem({
                  nameItem: itemData.name,
                  groupId: groupId,
                })
              )
            }
          >
            Cancel
          </button>
        </Buttons>
      ) : (
        <Buttons>
          <button
            onClick={() =>
              dispatch(
                setEditItem({
                  nameItem: itemData.name,
                  groupId: groupId,
                })
              )
            }
          >
            Edit
          </button>
          <button
            onClick={() =>
              dispatch(
                deleteItem({
                  nameItem: itemData.name,
                  groupId: groupId,
                })
              )
            }
          >
            Del
          </button>
        </Buttons>
      )}
    </ItemStyle>
  );
};

export default Item;
