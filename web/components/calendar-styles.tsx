import styled from "styled-components";
import { darken } from "polished";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

type CalendarDayProps = {
  bgColor?: string;
};
export const CalendarDayBlock = styled.div<CalendarDayProps>`
  cursor: pointer;
  background-color: ${props => (props.bgColor ? props.bgColor : "white")}
  color: #000;
  min-height: 70px;
  min-width: 200px;
  display:flex
  align-items:center 
  justify-content:center 
  flex-direction:row
  border-right-style: solid;
  border-right-width: .2px;
  border-right-color: ${props => props.theme.colors["dark"]} 
  border-bottom-style: solid;
  border-bottom-width: .2px;
  border-bottom-color: ${props => props.theme.colors["dark"]} 
  text-transform: uppercase;
  font-weight: bold;
`;

type MeetingIndicatorProps = {
  roomColor: string;
};
export const MeetingIndicator = styled.div<MeetingIndicatorProps>`
background-color: ${props => props.roomColor}
border-radius: 50%;
color:${props => props.theme.colors["dark"]}
width: 40px;
height: 40px;
font-weight:bold
display:flex;
align-items:center 
justify-content:center 
font-size: 25px;




`;
export const HourContainer = styled.div`
color:${props => props.theme.colors["dark"]}
width: 70px;
height: 70px;
font-weight:bold
display:flex;
align-items:center
margin: 0 20px  0 0 
justify-content:flex-end 

font-size: 25px;
`;

export const RoomNumber = styled.div`
  color:${props => props.theme.colors["dark"]} 
  font-size: 20px;
  margin: 10px
  display:flex;
  align-items:center 
  justify-content:center 
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
