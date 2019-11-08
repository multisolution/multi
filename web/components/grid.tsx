import styled, { css, FlattenSimpleInterpolation } from "styled-components";
export enum Align {
  Start = "flex-start",
  Center = "center",
  End = "flex-end"
}
const gridCss = css<GridProps>`
  display: flex;
  flex: 1;
  justify-content: ${props => props.crossAxis};
  align-items: ${props => props.mainAxis};
  ${props => props.decoration}
`;

type GridProps = {
  space?: number;
  mainAxis?: Align;
  crossAxis?: Align;
  decoration?: FlattenSimpleInterpolation;
};

export const Column = styled.div<GridProps>`
${gridCss}
flex-direction: column;
height:100%;
  & > * {
    
    margin-bottom: ${props => (props.space != 8 ? props.space : 8)}px
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
    flex: 1;
    margin-right: ${({ space = 8 }) => space}px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
