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
  const [roomCheck, setRoomCheck] = useState();

  let calendarKey: any;
  const getCalendar = useQuery(
    gql`
   query calendar{
  calendar{
    date
    times{
      hour
      meetings{
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
    console.log(getCalendar.data)
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
        {renderRows()}
      </Row>
    </div>
  );

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


  function renderRows() {



    return Array.from({ length: calendarSize }).map((_, index: number) => {

      const cellDate = new Date()
      cellDate.setDate(cellDate.getDate() + index)
      cellDate.setSeconds(0);
      cellDate.setMilliseconds(0);
      cellDate.setUTCHours(index, 0, 0);

      return (<Column key={index}>
        <DayIndicatorContainer>


          <WeekDay>{daysNames[cellDate.getDay()]}</WeekDay>
          <MonthDay current={new Date().toString() == cellDate.toString()}>{cellDate.getDate()}</MonthDay>
        </DayIndicatorContainer>
        {renderColumns(cellDate, index)}
      </Column>);
    });
  }

  function renderColumns(cellDate: Date, rowIndex: number) {
    console.log(getCalendar.data)
    return (
      <Column key={new Date().toISOString() + Math.random()} space={0}>
        {Array.from({ length: 24 }).map((_, index: number) => {

          let currentCell = (rowIndex + 1) * (index + 1)
          // console.log('CELL NUM ' + ((index + 1) * daysNames.length))
          // console.log('CURRENTE CELL' + (currentCell))


          // console.log(index)
          // if (!calendarKey) {
          //   return;
          // }
          // const meettings = calendarKey[cellDate.toISOString()];







          // if (meettings) {
          //   return (
          //     <CalendarDayBlock onClick={dayBlockClickHandler} key={currentDate.toISOString()}>
          //       {meettings.map((meeting: Meeting) => {
          //         return (
          //           <MeetingIndicator roomColor={meeting.room.color}>
          //             <RoomNumber>{meeting.room.id[meeting.room.id.length - 1]}</RoomNumber>
          //           </MeetingIndicator>
          //         );
          //       })}
          //     </CalendarDayBlock>
          //   );
          // }

          return <CalendarDayBlock onClick={dayBlockClickHandler} key={cellDate.toISOString() + cellDate.getDay()}>

            {(() => {
              // console.log(getRooms.data)

              if (1 > 0) {
                return <div>Tem reunião</div>;
              }
              else {
                return <div>Não tem reunião reunião</div>;
              }
            })()}
          </CalendarDayBlock>;
        })
        }
      </Column >
    );
  }


  function renderContent() {

  }

  function dayBlockClickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    console.log(event.currentTarget);
  }
};
export default Calendar;
