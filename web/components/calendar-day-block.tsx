import styled from "styled-components";
import { darken } from "polished";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";


type CalendarDayProps = {
  bgColor?: string
}
export const CalendarDayBlock = styled.div<CalendarDayProps>`
  cursor: pointer;
  background-color: ${props => props.bgColor ? props.bgColor : 'white'}
  color: white;
  min-height: 70px;
  min-width: 200px;
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  text-transform: uppercase;
  font-weight: bold;
`;

