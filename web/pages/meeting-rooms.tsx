import { NextPage } from "next";
import React from "react";

import { Container, Section, Room } from "../components/global-style";
import Layout from "../components/layout";
import { Row, Column } from "../components/grid";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MeetingRoom, Meeting } from "../lib/models";
import { withApollo } from "../lib/apollo";
import { array } from "prop-types";

const MeetingRooms: NextPage = () => {
  const getRooms = useQuery(
    gql`
      query meetingRooms {
        meetingRooms {
          id
          roomNumber
          description
          color
        }
      }
    `
  );

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <Column>
              <Row>{renderTable()}</Row>
              <Row>{renderCalenddar()}</Row>
            </Column>
          </Container>
        </Section>
      </Layout>
    </>
  );

  function renderCalenddar() {
    return calendarData.map((data: any, index: number) => (
      <Column>
        <div>{data.date}</div>
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

          if (hasMeetings.length == 0) {
            return <div></div>;
          }
          return <div>{`${hasMeetings.length} reuniões`}</div>;
        })}
      </Column>
    );
  }

  function renderTable() {
    if (getRooms.data) {
      return getRooms.data.meetingRooms.map((room: MeetingRoom, index: number) => (
        <Room id={room.id} onClick={meetingRoomClickHandler} bgColor={room.color} key={room.id}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <b>{room.id} </b>
            <b>{room.description}</b>
          </div>
        </Room>
      ));
    }
  }

  function meetingRoomClickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    console.log(event.currentTarget.id);
  }
};

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

// document.addEventListener("DOMContentLoaded", function() {
//   var calendarEl = document.getElementById("calendar");
//   if (calendarEl) {
//     var calendar = new Calendar(calendarEl, {
//       plugins: [dayGridPlugin]
//     });

//     calendar.render();
//   }
// });

export default withApollo(MeetingRooms);
