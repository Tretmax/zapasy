import styled from "styled-components";

const ItemStyle = styled.div`
  padding-left: 2%;
  padding-right: 2%;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  color: grey;
  font-size: xx-small;
`;
const NameArea = styled.div`
  width: 20%;
  display: flex;
  justify-content: start;
`;

const ContentArea = styled.div`
  width: 40%;
  display: flex;
  align-items: start;
`;

const ButtonsArea = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const TargetArea = styled.div`
  width: 50%;
 
`;

const ItemTitle = ({ activeTarget }) => {
  return (
    <ItemStyle>
      <NameArea>Ім'я</NameArea>
      <ContentArea>
        {activeTarget ? (
          <TargetArea>
            Цільове <br /> значення
          </TargetArea>
        ) : (
          ""
        )}

        <p>
          Поточне <br />
          значення
        </p>
      
      </ContentArea>
      <ButtonsArea>
        <p>Рівень</p>
      </ButtonsArea>
    </ItemStyle>
  );
};

export default ItemTitle;
