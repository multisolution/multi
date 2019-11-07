import { Column, Row } from "./grid";
import { CalendarDayBlock } from "./calendar-day-block";
import { Meeting } from "../lib/models";

const Calendar = () => (
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
  return calendarData.map((data: any, index: number) => (
    <Column key={index * Math.random() * 1000}>
      <div>{data.date.id}</div>
      {baseCalendar(data.mettings)}
    </Column>
  ));
}

function baseCalendar(mettings: Meeting[]) {
  return (
    <Column>
      {Array.from({ length: 24 }).map((_, index: number) => {
        <div>{index}</div>;
        const hasMeetings = mettings.filter(meeting => {
          return Math.random() > 0.5; //index>= meeting.startsAt && index< meeting.endsAt
        });

        if (hasMeetings.length > 0) {
          return (
            <CalendarDayBlock
              key={index * Math.random() * 1000}
              bgColor="#aabbcc"
            >{`${hasMeetings.length} reuniões`}</CalendarDayBlock>
          );
        }
        return <CalendarDayBlock key={index * Math.random() * 1000}>disponível</CalendarDayBlock>;
      })}
    </Column>
  );
}

const calendarData = [
  {
    date: "06-11-19",
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
  },
  {
    date: "06-11-19",
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
      },
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
      },
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
  },
  {
    date: "06-11-19",
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
  },
  {
    date: "06-11-19",
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
  },
  {
    date: "06-11-19",
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
  },
  {
    date: "06-11-19",
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
  },
  {
    date: "06-11-19",
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
  }
];

export default Calendar;
