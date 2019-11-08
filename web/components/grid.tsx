import styled from "styled-components";

export const Column = styled.div<{ space?: number }>`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items:flex-start;

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
  align-items:flex-start;
  justify-content:flex-start;

  & > * {
    margin-bottom: ${({ space = 8 }) => space}px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
