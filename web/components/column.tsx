import styled from "styled-components";

export const Column = styled.div<{ space?: number }>`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: ${({ space = 8 }) => space}px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
