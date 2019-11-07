import { Column, Row } from "./grid";
import { CalendarDayBlock, MonthDay, DayIndicatorContainer, WeekDay } from "./calendar-styles";
import { Meeting } from "../lib/models";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";

const calendarSize = 7;
const daysNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const Calendar = () => {
  const dates = Array.from({ length: calendarSize }).map((_, index: number) => {
    var currentDay = new Date();
    if (index > 0) {
      currentDay.setDate(currentDay.getDate() + index);
    }
    return {
      date: currentDay,
      mettings: [
        {
          id: "String",
          startsAt: "Date",
          endsAt: "Date",
          room: {
            id: "string",
            roomNumber: "number",
            description: "string",
            color: "string"
          }
        }
      ]
    };
  });

  return (
    <div>
      <Row>
        {renderHours()}
        {renderCalenddar()}
      </Row>
    </div>
  );

  function renderHours() {
    return (
      <Column>
        <div>Horários</div>
        {Array.from({ length: 24 }).map((_, index: number) => {
          return <CalendarDayBlock key={index * Math.random() * 1000}>{index + ":00"}</CalendarDayBlock>;
        })}
      </Column>
    );
  }

  function renderCalenddar() {
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
              }
            }
          }
        }
      `
    );

    console.log(getCalendar.data);

    return dates.map((data: any, index: number) => (
      <Column key={index * Math.random() * 1000}>
        <DayIndicatorContainer>
          <WeekDay>{daysNames[data.date.getDay()]}</WeekDay>
          <MonthDay current={new Date().toString() == data.date.toString()}>{data.date.getDate()}</MonthDay>
        </DayIndicatorContainer>
        {baseCalendar(data.mettings)}
      </Column>
    ));
  }

  function baseCalendar(mettings: Meeting[]) {
    return (
      <Column>
        {Array.from({ length: 24 }).map((_, index: number) => {
          <div>{index}</div>;
          // const hasMeetings = mettings.filter(meeting => {
          //   return Math.random() > 0.5; //index>= meeting.startsAt && index< meeting.endsAt
          // });

          // if (hasMeetings.length > 0) {
          //   return (
          //     <CalendarDayBlock
          //       key={index * Math.random() * 1000}
          //       bgColor="#aabbcc"
          //     >{`${hasMeetings.length} reuniões`}</CalendarDayBlock>
          //   );
          // }
          return <CalendarDayBlock key={index * Math.random() * 1000}>disponível</CalendarDayBlock>;
        })}
      </Column>
    );
  }
};

export default Calendar;
