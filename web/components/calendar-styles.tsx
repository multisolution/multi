import styled from "styled-components";
import { darken } from "polished";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

type CalendarDayProps = {
  bgColor?: string;
};
export const CalendarDayBlock = styled.div<CalendarDayProps>`
  background-color: ${props => (props.bgColor ? props.bgColor : "white")}
  color: #000;
  display:flex
  flex:1;
  align-items:center;
  width:100%;
  flex-direction:column;
  text-transform: uppercase;
  font-weight: bold;
`;

export const HourContainer = styled.div`
color:${props => props.theme.colors["dark"]}

display:flex;
height:33px !important;
align-items:flex-start;
justify-content:flex-end ;
font-size: 15px;
  
`;

type MonthDayProps = {
  current?: boolean;
};
export const MonthDay = styled.div<MonthDayProps>`
flex:1;
    background-color: ${props => (props.current ? props.theme.colors["primary"] : "#fff")}
    border-radius: 50%;
    color:${props => (props.current ? "#fff" : props.theme.colors["dark"])}
    display:flex;
    font-weight:bold;
    align-items:center ;
    justify-content:center ;
    font-size: 25px;
    
`;
export const WeekDay = styled.div`
flex:1;
  color:${props => props.theme.colors["dark"]} 
  font-size: 20px;
  text-indent: -2.5px;
  margin: 0 0 5px 0;
`;
export const DayIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export type RoomIndicatorProps = {
  occuped?: boolean;
};
export const RoomIndicator = styled.div<RoomIndicatorProps>`
    background-color: ${props => (props.occuped ? props.theme.colors["primary"] : "#fff")}
    display:flex;
    flex:1;
    font-color:#fff
    color:${props => (props.occuped ? "#fff" : props.theme.colors["dark"])};
    flex-direction:row;
    width:100%;
    height:8px;
    align-items:space-around ;
    justify-content:space-around ;
`;
