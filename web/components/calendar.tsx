import { Column, Row } from "./grid";
import {
  CalendarDayBlock,
  MonthDay,
  DayIndicatorContainer,
  WeekDay,
  MeetingIndicator,
  RoomNumber,
  HourContainer
} from "./calendar-styles";
import { Meeting, MeetingRoom } from "../lib/models";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Room } from "./global-style";

const Calendar = () => {
  const [roomCheck, setRoomCheck] = useState([]);

  let calendarKey: any;
  const getCalendar = useQuery(
    gql`
      query Calendar {
        calendar {
          date
          meetings {
            id
            startsAt
            endsAt
            room {
              roomNumber
              color
              description
              id
            }
          }
        }
      }
    `
  );
  const getRooms = useQuery(
    gql`
      query meetingRooms {
        meetingRooms {
          id
          color
        }
      }
    `
  );
  if (getCalendar.data) {
    calendarKey = getCalendar.data.calendar.reduce(
      (acc: { [date: string]: Meeting[] }, date: { date: string; meetings: Meeting[] }) => {
        acc[date.date] = date.meetings;
        return acc;
      },
      {}
    );
  }

  const calendarSize = 7;
  const daysNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const dates = Array.from({ length: calendarSize }).map((_, index: number) => {
    var currentDay = new Date();
    if (index > 0) {
      currentDay.setDate(currentDay.getDate() + index);
    }

    return {
      date: currentDay
    };
  });

  return (
    <div>
      <Row>
        <Column>{renderRooms()}</Column>
        {renderHours()}
        {renderCalenddar()}
      </Row>
    </div>
  );

  function renderRooms() {
    if (getRooms.data) {
      return getRooms.data.meetingRooms.map((room: MeetingRoom, index: number) => (
        <Room id={room.id} onClick={() => console.log(room.id)} bgColor={room.color} key={room.id}>
          <div>
            <b>{room.id} </b>
            <b>{room.description}</b>
          </div>

          <div>
            <b>{room.id}</b>
            <input type="checkbox" />;
          </div>
        </Room>
      ));
    }
  }

  function renderHours() {
    return (
      <Column>
        <div style={{ minHeight: "81px" }}></div>
        {Array.from({ length: 24 }).map((_, index: number) => {
          return <HourContainer key={index * Math.random() * 1000}>{index + ":00"}</HourContainer>;
        })}
      </Column>
    );
  }

  function renderCalenddar() {
    return dates.map((data: any, index: number) => (
      <Column key={data.date.toISOString + index}>
        <DayIndicatorContainer>
          <WeekDay>{daysNames[data.date.getDay()]}</WeekDay>
          <MonthDay current={new Date().toString() == data.date.toString()}>{data.date.getDate()}</MonthDay>
        </DayIndicatorContainer>
        {baseCalendar(data.mettings, data.date)}
      </Column>
    ));
  }

  function baseCalendar(mettings: Meeting[], currentDate: Date) {
    return (
      <Column space={0}>
        {Array.from({ length: 24 }).map((_, index: number) => {
          <div>{index}</div>;
          {
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);
            currentDate.setUTCHours(index, 0, 0);
          }
          if (!calendarKey) {
            return;
          }
          const meettings = calendarKey[currentDate.toISOString()];
          if (meettings) {
            return (
              <CalendarDayBlock onClick={dayBlockClickHandler} key={currentDate.toISOString()}>
                {meettings.map((meeting: Meeting) => {
                  return (
                    <MeetingIndicator roomColor={meeting.room.color}>
                      <RoomNumber>{meeting.room.id[meeting.room.id.length - 1]}</RoomNumber>
                    </MeetingIndicator>
                  );
                })}
              </CalendarDayBlock>
            );
          }

          return <CalendarDayBlock onClick={dayBlockClickHandler} key={currentDate.toISOString()} />;
        })}
      </Column>
    );
  }

  function dayBlockClickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    console.log(event.currentTarget);
  }
};
export default Calendar;
