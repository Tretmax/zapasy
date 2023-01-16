import { Tab } from "bootstrap";
import { Tabs } from "react-bootstrap";
import Reserves from "../containers/reserves";
import Todolist from "../containers/todolist";

const Main = () => {
  return (
    <main>
      <div>
        <Tabs defaultActiveKey="profile" id="zapasy" className="mb-3" fill>
          <Tab eventKey="Запасы" title="Запасы">
            <Reserves />
          </Tab>
          <Tab eventKey="Список покупок" title="Список покупок">
            <Todolist />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
};
export default Main;
