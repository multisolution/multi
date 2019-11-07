import styled from "styled-components";
import { darken } from "polished";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

type CalendarDayProps = {
  bgColor?: string;
};
export const CalendarDayBlock = styled.div<CalendarDayProps>`
  cursor: pointer;
  background-color: ${props => (props.bgColor ? props.bgColor : "white")}
  color: white;
  min-height: 70px;
  min-width: 200px;
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  text-transform: uppercase;
  font-weight: bold;
`;

type MonthDayProps = {
  current?: boolean;
};

export const MonthDay = styled.div<MonthDayProps>`
    background-color: ${props => (props.current ? props.theme.colors["primary"] : "#fff")}
    border-radius: 50%;
    color:${props => (props.current ? "#fff" : props.theme.colors["dark"])}
    width: 50px;
    height: 50px;
    display:flex;
    font-weight:bold
    align-items:center 
    justify-content:center 
    font-size: 25px;
    
`;
export const WeekDay = styled.div`
  color:${props => props.theme.colors["dark"]} 
  font-size: 20px;
  text-indent: -2.5px;
  margin: 0 0 5px 0;
`;
export const DayIndicatorContainer = styled.div`
    min-width: 200px;
    display:flex;
    flex-direction:column
    align-items:center 
`;
