import { todo } from "../mocks/data";
import styled from "styled-components";


const Todos = styled.div `
display: flex;
`

const Todolist = () => {
  return (
    <div>
      {todo.map((item) => {
        return (
          <Todos>
            <input type='checkbox' />
            <p>{item.name}</p>
            <p>{item.value}</p>
          </Todos>
        );
      })}
    </div>
  );
};
export default Todolist;
