import { Button, InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { DonutChart } from "react-circle-chart";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  setCurrentValue,
  setTargetValue,
} from "../redux/sliceReserves";

const ItemStyle = styled.div`
  padding-left: 2%;
  padding-right: 2%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: all 0.3s;
`;
const NameArea = styled.div`
  width: 20%;
`;

const ContentArea = styled.div`
  width: 40%;

  display: flex;
  align-items: center;
`;
const TargetArea = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

const ValueArea = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

const ButtonsArea = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
`;

const Buttons = styled.div`
  display: flex;
`;

const Status = styled.div`
  display: flex;
  height: 20px;
`;

const Item = ({ itemData, groupId, activeTarget }) => {
  const [handlerInput, setInput] = useState("");
  const [isTargetValueRedact, setTargetValueRedact] = useState(false);
  const [isCurrentValueRedact, setCurrentValueRedact] = useState(false);

  const dispatch = useDispatch();
  const level = Math.floor((itemData.value / itemData.targetValue) * 100);

  return (
    <ItemStyle>
      <NameArea>{itemData.name}</NameArea>
      <ContentArea>
        {activeTarget ? (
          <TargetArea>
            {isTargetValueRedact ? (
              <>
                <InputGroup size="sm">
                  <Form.Control
                    type="number"
                    defaultValue={itemData.targetValue}
                    placeholder="Введіть цільове значення"
                    onChange={(e) => setInput(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-success"
                    className="px-1"
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
                    &#10004;
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setTargetValueRedact(false)}
                    className="px-1"
                  >
                    ✘
                  </Button>
                </InputGroup>
              </>
            ) : (
              <>
                <p>{itemData.targetValue}</p>
                <Button
                  className="mx-2 px-1"
                  variant="secondary"
                  onClick={() => setTargetValueRedact(true)}
                >
                  ⚙
                </Button>
              </>
            )}
          </TargetArea>
        ) : (
          ""
        )}

        <ValueArea>
          {isCurrentValueRedact ? (
            <InputGroup size="sm">
              <Form.Control
                type="number"
                defaultValue={itemData.value}
                placeholder="Введіть поточне значення"
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <Button
                variant="outline-success"
                className="px-1"
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
                ✔
              </Button>
              <Button
                variant="outline-danger"
                className="px-1"
                onClick={() => setCurrentValueRedact(false)}
              >
                ✘
              </Button>
            </InputGroup>
          ) : (
            itemData.value
          )}{" "}
          {itemData.etc}
        </ValueArea>
      </ContentArea>
      <ButtonsArea>
        <Status>
          <DonutChart
            items={[
              {
                value: level,
                label: itemData.name,
                color: level < 50 ? "red" : level < 75 ? "yellow" : "green",
              },
            ]}
            trackColor="#dbe0ec"
            size="20"
            trackWidth="lg"
            showTotal={false}
            backgroundTooltipColor="none"
            tooltipFontSize="0"
          />
          {level}%
        </Status>
        {isCurrentValueRedact ? (
          ""
        ) : (
          <Buttons>
            <Button
              className="px-1"
              variant="warning"
              onClick={() => setCurrentValueRedact(true)}
            >
              Edit
            </Button>
            <Button
              className=" ms-1 px-1"
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
      </ButtonsArea>
    </ItemStyle>
  );
};

export default Item;
