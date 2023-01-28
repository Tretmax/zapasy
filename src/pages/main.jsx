import { Tab } from "bootstrap";
import { Tabs } from "react-bootstrap";
import Reserves from "../containers/reserves";
import Todolist from "../containers/todolist";
import styled from "styled-components";

const MainDisp = styled.main `
width: 100%;
background-color: lemonchiffon;
`

const Main = () => {
  return (
    <MainDisp>
      
        <Tabs defaultActiveKey="profile" id="zapasy" className="mb-3" fill>
          <Tab eventKey="Запасы" title="Запасы">
            <Reserves />
          </Tab>
          <Tab eventKey="Список покупок" title="Список покупок">
            <Todolist />
          </Tab>
        </Tabs>
      
    </MainDisp>
  );
};
export default Main;
