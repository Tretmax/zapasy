import { Button } from "react-bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addGroup, addItem } from "../redux/sliceReserves";
import Group from "../components/Group";
import Item from "../components/Item";
import ModalWindow from "../components/modal";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addBuyList } from "../redux/sliceTodo";

const Wrap = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
`;

const ButtonPanel = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const Reserves = () => {
  const [activeTarget, setActiveTarget] = useState(false);
  const buttonTarget = () => {
    setActiveTarget(!activeTarget);
  };
  const data = useSelector((state) => state.reserve.data);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const onSubmitGroupForm = (data) => {
    dispatch(addGroup(data.groupName));
    reset();
  };
  const createBuyingList = (data) => {
    const limit = 50;
    const buyingList = [];
    data.forEach((group) => {
      group.items.forEach((item) => {
        if (item.value / item.targetValue < limit / 100) {
          buyingList.push({
            groupId: group.id,
            itemId: item.id,
            name: item.name,
            value: item.targetValue - item.value,
            etc: item.etc,
            isCheck: false,
          });
        }
      });
    });
    return buyingList;
  };

  const createGroupForm = (
    <Form onSubmit={handleSubmit(onSubmitGroupForm)}>
      <Form.Group className="mb-3" controlId="formAddGroup">
        <Form.Control
          type="text"
          placeholder="Введіть назву групи"
          {...register("groupName")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Створити
      </Button>
    </Form>
  );

  const createItemForm = (groupId) => {
    const onSubmitItemForm = (data) => {
      dispatch(
        addItem({
          groupId: groupId,
          itemName: data.itemName,
          targetValue: data.targetValue,
          etc: data.etc,
          value: data.currentValue,
        })
      );
      reset();
    };
    return (
      <Form onSubmit={handleSubmit(onSubmitItemForm)}>
        <Form.Group className="mb-3" controlId="formAddItem">
          <Form.Label className="mt-3">Назва позиції</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введіть назву позиції"
            {...register("itemName")}
          />
          <Form.Label className="mt-3">Одиниці виміру</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введіть одиниці виміру"
            {...register("etc")}
          />
          <Form.Label className="mt-3">Цільове значення</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введіть цільове значення"
            {...register("targetValue")}
          />
          <Form.Label className="mt-3">Поточне значення</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введіть поточне значення"
            {...register("currentValue")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Створити
        </Button>
      </Form>
    );
  };

  return (
    <Wrap>
      <ButtonPanel>
        <Button variant="secondary" onClick={buttonTarget}>
          Edit Target
        </Button>
        <Button variant="secondary">Edit Limits</Button>
        <ModalWindow
          modalTitle={"Створення групи"}
          nameModalButton={"Створити групу"}
          content={createGroupForm}
          modalShow={""}
        />
        <Button
          variant="secondary"
          onClick={() => {
            dispatch(addBuyList(createBuyingList(data)));
          }}
        >
          За покупуами!
        </Button>
      </ButtonPanel>
      {data.map((item) => {
        return (
          <div>
            <Group groupData={item} />

            {item.isActive ? (
              <div>
                {item.items.map((el) => {
                  return (
                    <Item
                      itemData={el}
                      groupId={item.id}
                      activeTarget={activeTarget}
                    />
                  );
                })}
                <ModalWindow
                  modalTitle={"Створення позиції"}
                  nameModalButton={"Створити позицію"}
                  content={createItemForm(item.id)}
                  modalShow={""}
                  groupId={item.id}
                />
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
