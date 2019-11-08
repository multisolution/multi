import styled, { css, FlattenSimpleInterpolation } from "styled-components";

export enum Align {
  Start = "flex-start",
  Center = "center",
  End = "flex-end",
}

type GridProps = {
  space?: number;
  mainAxis?: Align;
  crossAxis?: Align;
  decoration?: FlattenSimpleInterpolation;
};

const gridCss = css<GridProps>`
  display: flex;
  justify-content: ${props => props.crossAxis};
  align-items: ${props => props.mainAxis};
  ${props => props.decoration}
`;

export const Column = styled.div<GridProps>`
  ${gridCss}
  flex-direction: column;
  height: 100%;

  & > * {
    margin-bottom: ${({ space = 8 }) => space}px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Row = styled.div<GridProps>`
  ${gridCss}
  flex-direction: row;
  width: 100%;

  & > * {
    margin-right: ${({ space = 8 }) => space}px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
