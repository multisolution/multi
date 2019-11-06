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

export const Row = styled.div<{ space?: number }>`
  display: flex;
  flex-direction: row;

  & > * {
    margin-bottom: ${({space = 8}) => space}px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
