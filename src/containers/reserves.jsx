import { Button } from "bootstrap";

import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addGroup, addItem } from "../redux/slice";
import Group from "../components/Group";
import Item from "../components/Item";

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
  return (
    <Wrap>
      <ButtonPanel>
        <button onClick={buttonTarget}>Edit Target</button>
        <button>Edit Limits</button>
        <button onClick={() => dispatch(addGroup("scssc"))}>Add Group</button>
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
                <button
                  onClick={() =>
                    dispatch(
                      addItem({
                        groupId: item.id,
                        itemName: "qwqw",
                        targetValue: 2323,
                        etc: "sdsd",
                        value: 3243,
                      })
                    )
                  }
                >
                  Add item
                </button>
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
