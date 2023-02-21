import { todo } from "../mocks/data";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doCheck } from "../redux/sliceTodo";

const Todos = styled.div`
  display: flex;
`;

const Todolist = () => {
  const buyingList = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();

  return (
    <div>
      {buyingList.map((item) => {
        return (
          <Todos>
            <input
              type="checkbox"
              checked={item.isCheck}
              onChange={() => {
                dispatch(doCheck({ groupId: item.groupId, name: item.name }));
              }}
            />
            <p>{item.name}</p>
            <p>{item.value}</p>
            <p>{item.etc}</p>
          </Todos>
        );
      })}
    </div>
  );
};
export default Todolist;
