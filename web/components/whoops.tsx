import React, {FunctionComponent} from "react";
import styled from "styled-components";

const StyledWhoops = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 24px;
  font-wight: bold;
`;

const Whoops: FunctionComponent = () => {
  return <StyledWhoops>Algo de errado não está certo;</StyledWhoops>;
};

export default Whoops;
