import React, {FunctionComponent} from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading: FunctionComponent = () => {
  return (
    <StyledLoading>
      Carregando...
    </StyledLoading>
  );
};

export default Loading;
