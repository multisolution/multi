import {Column, Row} from "./grid";
import {Calendar as CalendarModel, CalendarTime} from "../lib/models";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, {FunctionComponent, MouseEvent} from "react";
import Whoops from "./whoops";
import Loading from "./loading";
import {sameDate, weekDays} from "../lib/misc";
import styled, {css} from "styled-components";

type CalendarProps = {
  onTimeGroupClick: (date: Date, time: string) => void;
};

const Calendar: FunctionComponent<CalendarProps> = ({onTimeGroupClick: timeGroupClickDelegate}) => {
    const calendarQuery = useQuery<{ calendar: CalendarModel[] }>(
    gql`
      query calendar {
        calendar {
          date
          times {
            hour
            meetings {
              id
              room {
                id
                color
              }
            }
          }
        }
      }
    `
  );

  if (calendarQuery.error || (calendarQuery.data === undefined && !calendarQuery.loading)) {
    console.error("Error querying calendar", calendarQuery.error);
    return <Whoops/>;
  }

  if (calendarQuery.loading || calendarQuery.data === undefined) {
    return <Loading/>;
  }

  const today = new Date();

  function onTimeGroupClick(date: Date, time: CalendarTime) {
    timeGroupClickDelegate(date, time.hour);
  }

  return (
    <Row space={0}>
      <YAxis/>
      {calendarQuery.data.calendar.map(calendar => {
        const date = new Date(`${calendar.date} 00:00:00`);

        return (
          <CalendarDate>
            <WeekDayLabel>{weekDays[date.getDay()]}</WeekDayLabel>
            <DateLabel current={sameDate(date, today)}>{date.getDate()}</DateLabel>

            {calendar.times.map(timeGroup => {
              function onClick(event: MouseEvent<HTMLDivElement>) {
                event.preventDefault();
                onTimeGroupClick(date, timeGroup[0]);
              }

              return (
                <TimeGroup onClick={onClick}>
                  {timeGroup.map(time => (
                    <Time>
                      {time.meetings.map(meeting => (
                        <CalendarMeeting color={meeting.room.color}/>
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
        margin-top: 53px;
      `}
    >
      {Array.from({length: 24}).map((_, index: number) => (
        <YAxisLabel key={`hour-${index}`}>{index + ":00"}</YAxisLabel>
      ))}
    </Column>
  );
};

const YAxisLabel = styled.div`
  color:${props => props.theme.colors["dark"]}
  display:flex;
  align-items:flex-start;
  justify-content:flex-end ;
  font-size: 16px;  
`;

const calendarBorder = "1px solid #f1f1f1";

const CalendarDate = styled.div`
  color: #000;
  display:flex
  flex:1;
  align-items:center;
  width:100%;
  flex-direction:column;
  text-transform: uppercase;
  font-weight: bold;
  border-right: ${calendarBorder};
  
  &:last-child {
    border-right: none;
  }
`;

const WeekDayLabel = styled.div`
  color:${props => props.theme.colors["dark"]} 
  font-size: 20px;
  text-indent: -2.5px;
  margin: 0 0 5px 0;
`;

const DateLabel = styled.div<{ current: boolean }>`
  background-color: ${props => (props.current ? props.theme.colors["primary"] : "#fff")}
  border-radius: 50%;
  color:${props => (props.current ? "#fff" : props.theme.colors["dark"])}
  display:flex;
  font-weight:bold;
  align-items:center ;
  justify-content:center ;
  font-size: 25px;    
`;

const TimeGroup = styled.div`
  width: 100%;
  border-top: ${calendarBorder};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
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
