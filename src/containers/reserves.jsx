import { Button } from "bootstrap";
import { data } from "../mocks/data";
import styled from "styled-components";

const Item = styled.div`
  display: flex;
`;

const Group = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  background-color: blueviolet;
`;

const Reserves = () => {
  return (
    <div>
      {data.map((item) => {
        return (
          <div>
            <Group>
              <div> ! </div>
              <h3>{item.group}</h3>
            </Group>
            {item.isActive ? (
            <div>
            {item.items.map((el) => {
              return (
                <Item>
                  <p>{el.name}</p>
                  <p>{el.value}</p>
                  <button>Edit</button>
                  <button>Del</button>
                </Item>
              );
            })}
          </div>
          ) : (
          <></>) }
            
          </div>
        );
      })}
    </div>
  );
};
export default Reserves;
