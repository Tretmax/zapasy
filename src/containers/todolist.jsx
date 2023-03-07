import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doCheck } from "../redux/sliceTodo";
import FinishBuyList from "../components/finishBuyList";
import ModalWindow from "../components/modal";
import { Form } from "react-bootstrap";

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
          <Todos key={item.id}>
            <Form.Check 
              
              checked={item.isCheck}
              onChange={() => {
                dispatch(
                  doCheck({ groupId: item.groupId, itemId: item.itemId })
                );
              }}
            />
            <p>
              {item.name} {item.value} {item.etc}
            </p>
          </Todos>
        );
      })}
      <ModalWindow
        modalTitle={"Завершити покупки"}
        nameModalButton={"Завершити покупки"}
        content={FinishBuyList()}
      />
    </div>
  );
};
export default Todolist;
