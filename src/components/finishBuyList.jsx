import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { finishBuy } from "../redux/sliceReserves";
import { useSelector } from "react-redux";

const FinishBuyList = () => {
  const dispatch = useDispatch();
  const buyingList = useSelector((state) => state.todo.data);
  const { register, handleSubmit, reset } = useForm();
  const onSubmitFinishBuyForm = (data) => {
    dispatch(finishBuy(data));
    reset();
 
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmitFinishBuyForm)}>
        {buyingList.map((item) => {
          if (item.isCheck) {
            return (
              <>
                <Form.Label className="mt-3">{item.name}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={item.etc}
                  {...register(`${item.itemId}`)}
                  required
                />
              </>
            );
          }
        })}
        <Button variant="primary" type="submit">
          Завершити покупки
        </Button>
      </Form>
    </div>
  );
};

export default FinishBuyList;
