import { Button } from "bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addGroup, deleteGroup, deleteItem, setEditGroup, setEditItem, addItem,setActiveGroup } from "../redux/slice";
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
  const data = useSelector(state=>state.reserve.data)
  console.log(data)
  const dispatch = useDispatch ()
  return (
    <Wrap>
      <ButtonPanel>
        <button onClick={buttonTarget}>Edit Target</button>
        <button>Edit Limits</button>
        <button onClick={()=>dispatch(addGroup('scssc'))}>Add Group</button>
      </ButtonPanel>
      {data.map((item) => {
        return (
          <div>
            <Group >
              <div> ! </div>
              <h3 onClick={()=>dispatch(setActiveGroup(item.id))}>{item.groupName}</h3>

              {item.isRedactGroup ? (
                <Buttons>
                  <button>Save</button>
                  <button onClick={()=>dispatch(setEditGroup(item.id))}>Cancel</button>
                </Buttons>
              ) : (
                <Buttons>
                  <button onClick={()=>dispatch(setEditGroup(item.id))}>Edit</button>
                  <button onClick={()=>dispatch(deleteGroup(item.id))}>Del</button>
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
                      {el.isRedactItem ? (
                        <Buttons>
                          <button>Save</button>
                          <button onClick={()=>dispatch(setEditItem({nameItem: el.name, groupId: item.id}))}>Cancel</button>
                        </Buttons>
                      ) : (
                        <Buttons>
                          <button onClick={()=>dispatch(setEditItem({nameItem: el.name, groupId: item.id}))}>Edit</button>
                          <button onClick={()=>dispatch(deleteItem({nameItem: el.name, groupId: item.id}))}>Del</button>
                        </Buttons>
                      )}
                    </Item>
                  );
                })}
                <button onClick={()=> dispatch (addItem ({
                  groupId: item.id,
                  itemName : 'qwqw',
                  targetValue: 2323, 
                  etc: 'sdsd',
                  value: 3243,
                }))}>Add item</button>
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
