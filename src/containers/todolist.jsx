import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doCheck } from "../redux/sliceTodo";
import FinishBuyList from "../components/finishBuyList";
import ModalWindow from "../components/modal";
import { Form } from "react-bootstrap";

const Todos = styled.div`
  display: flex;
  margin-bottom: 5px;
  ${(props) =>
    !props.active ? "" : "text-decoration:line-through; color:grey"};
`;

const ItemArea = styled.div`
  display: flex;
  width: 100%; ;
`;
const ItemName = styled.div`
  width: 50%;
`;
const ItemData = styled.div`
  width: 20%;
`;

const Todolist = () => {
  const buyingList = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();

  return (
    <div>
      {buyingList.map((item) => {
        return (
          <Todos key={item.id} active={item.isCheck}>
            <Form.Check
              className="mx-3"
              checked={item.isCheck}
              onChange={() => {
                dispatch(
                  doCheck({ groupId: item.groupId, itemId: item.itemId })
                );
              }}
            />
            <ItemArea>
              <ItemName>{item.name}</ItemName>
              <ItemData>
                {item.value} {item.etc}
              </ItemData>
            </ItemArea>
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
