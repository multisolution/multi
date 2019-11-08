import { NextPage } from "next";
import React from "react";
import { Container, Section, Room } from "../components/global-style";
import Layout from "../components/layout";
import { Row, Column } from "../components/grid";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MeetingRoom } from "../lib/models";
import { withApollo } from "../lib/apollo";
import Calendar from "../components/calendar";

const MeetingRooms: NextPage = () => {
  return (
    <>
      <Layout>
        <Column>
          <Calendar></Calendar>
        </Column>
      </Layout>
    </>
  );

  function renderHours() {
    return (
      <Column>
        <div>Horários</div>
        {Array.from({ length: 24 }).map((_, index: number) => {
          return <CalendarDayBlock>{index + ':00'}</CalendarDayBlock>
        })}
      </Column>
    );
  }

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

          if (hasMeetings.length > 0) {
            return <CalendarDayBlock bgColor='#aabbcc'>{`${hasMeetings.length} reuniões`}</CalendarDayBlock>;
          }
          return <CalendarDayBlock>disponível</CalendarDayBlock>;
        })}
      </Column>
    );
  }

  function renderTable() {
    if (getRooms.data) {
      return getRooms.data.meetingRooms.map((room: MeetingRoom, index: number) => (
        <Room id={room.id} onClick={meetingRoomClickHandler} bgColor={room.color} key={room.id}>
          <div>
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

export default withApollo(MeetingRooms);
