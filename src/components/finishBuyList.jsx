import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { finishBuy } from "../redux/sliceReserves";

const FinishBuyList = (buyingList) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const onSubmitFinishBuyForm = (data) => {
    dispatch(finishBuy(data));
    reset();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmitFinishBuyForm)}>
        {buyingList.map((item) => {
          return (
            <>
              <Form.Label className="mt-3">{item.name}</Form.Label>
              <Form.Control
                type="number"
                placeholder={item.groupName}
                {...register(`${item.itemId}`)}
              />
              <p>{item.etc}</p>
            </>
          );
        })}
        <Button variant="primary" type="submit">
          Завершити покупки
        </Button>
      </Form>
    </div>
  );
};

export default FinishBuyList;
