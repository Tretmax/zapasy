import { Button } from "bootstrap";
import { data } from "../mocks/data";
import styled from "styled-components";
import { useState } from "react";

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

const Group = styled.div`
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
`

const Reserves = () => {
  const [activeTarget, setActiveTarget] = useState(false);
  const buttonTarget = () => {
    setActiveTarget(!activeTarget);
  };
  
  return (
    <Wrap>
      <ButtonPanel>
        <button onClick={buttonTarget}>Edit Target</button>
        <button>Edit Limits</button>
        <button>Add Group</button>
      </ButtonPanel>
      {data.map((item) => {
        return (
          <div>
            <Group>
              <div> ! </div>
              <h3>{item.group}</h3>

              {item.isRedactGroup ? (
                <Buttons>
                  <button>Save</button>
                  <button onClick={()=>{item.isRedactGroup = !item.isRedactGroup}}>Cancel</button>
                </Buttons>
              ) : (
                <Buttons>
                  <button>Edit</button>
                  <button>Del</button>
                </Buttons>
              )}
            </Group>
            {item.isActive ? (
              <div>
                {item.items.map((el) => {
                  return (
                    <Item>
                      <p>{el.name}</p>
                      {activeTarget ? <p>{el.targetValue}</p> : ""}
                      <p>{`${el.value} ${el.etc}`}</p>
                      <Status />
                      {el.isRedact ? (
                        <Buttons>
                          <button>Save</button>
                          <button>Cancel</button>
                        </Buttons>
                      ) : (
                        <Buttons>
                          <button>Edit</button>
                          <button>Del</button>
                        </Buttons>
                      )}
                    </Item>
                  );
                })}
                <button>Add item</button>
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </Wrap>
  );
};
export default Reserves;
