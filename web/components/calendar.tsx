import {Column, Row} from "./grid";
import {Calendar as CalendarModel} from "../lib/models";
import React, {FunctionComponent, MouseEvent} from "react";
import {sameDate, weekDays} from "../lib/misc";
import styled, {css} from "styled-components";
import {lighten} from "polished";

type CalendarProps = {
  calendar: CalendarModel[];
  onTimeGroupClick: (date: Date, time: string) => void;
};

const Calendar: FunctionComponent<CalendarProps> = ({calendar, onTimeGroupClick}) => {
  const today = new Date();

  return (
    <Row space={0}>
      <YAxis/>
      {calendar.map(calendar => {
        const date = new Date(`${calendar.date}`);

        return (
          <CalendarDate key={`calendar-date-${calendar.date}`}>
            <Header>
              <WeekDayLabel>{weekDays[date.getDay()]}</WeekDayLabel>
              <DateLabel current={sameDate(date, today)}>{date.getDate()}</DateLabel>
            </Header>
            {calendar.times.map((timeGroup, index) => {
              function onClick(event: MouseEvent<HTMLDivElement>) {
                event.preventDefault();
                onTimeGroupClick(date, timeGroup[0].hour);
              }

              return (
                <TimeGroup key={`calendar-date-${calendar.date}-${index}`} onClick={onClick}>
                  {timeGroup.map(time => (
                    <Time key={`calendar-time-${calendar.date}-${index}-${time.hour}`}>
                      {time.meetings.map((meeting, meetingIndex) => (
                        <CalendarMeeting
                          key={`calendar-meeting-${calendar.date}-${index}-${time.hour}-${meetingIndex}`}
                          color={meeting.room.color}
                        />
                      ))}
                    </Time>
                  ))}
                </TimeGroup>
              );
            })}
          </CalendarDate>
        );
      })}
    </Row>
  );
};

const YAxis: FunctionComponent = () => {
  return (
    <Column
      space={13}
      decoration={css`
        margin-top: 72px;
        margin-left: -56px;
      `}
    >
      {Array.from({ length: 24 }).map((_, index: number) => (
        <YAxisLabel key={`hour-${index}`}>
          {`${index}:00`}
        </YAxisLabel>
      ))}
    </Column>
  );
};

const YAxisLabel = styled.div`
  color:${props => props.theme.colors.dark}
  display:flex;
  align-items:flex-start;
  justify-content:flex-end ;
  font-size: 14px;  
  margin: 0 ${props => props.theme.space * 3}px 14px;
`;

const CalendarDate = styled.div`
  color: #000;
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: bold;
  border-right: 1px solid ${props => lighten(0.4, props.theme.colors.dark)};
  position: relative;

  &:last-child {
    border-right: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1;
  background: white;
  width: 100%;
  border-bottom: 1px solid ${props => lighten(0.4, props.theme.colors.dark)};
  padding: 8px;
  position: sticky;
  top: 0;
`;

const WeekDayLabel = styled.div`
  color:${props => props.theme.colors["dark"]} 
  font-size: 16px;
`;

const DateLabel = styled.div<{ current: boolean }>`
  background-color: ${props => (props.current ? props.theme.colors["primary"] : "#fff")}
  border-radius: 50%;
  color:${props => (props.current ? "#fff" : lighten(0.16, props.theme.colors.dark))}
  display:flex;
  font-weight:bold;
  align-items:center ;
  justify-content:center ;
  font-size: 24px;
  padding: 6px 8px;
`;

const TimeGroup = styled.div`
  width: 100%;
  cursor: pointer;
  z-index: 0;
  border-radius: ${props => props.theme.borderRadius}px;
  overflow: hidden;

  &:nth-child(odd) {
    background-color: #f7f7f7;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: scale(1.1, 1.1);
    z-index: 1;
  }
`;

const Time = styled.div`
  height: 8px;
  display: flex;
`;

const CalendarMeeting = styled.div<{ color: string }>`
  background: ${props => props.color};
  flex: 1;
`;

export default Calendar;
