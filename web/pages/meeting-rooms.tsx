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
              <Row>{renderRooms()}</Row>
              <Calendar></Calendar>
            </Column>
          </Container>
        </Section>
      </Layout>
    </>
  );

  function renderRooms() {
    if (getRooms.data) {
      return getRooms.data.meetingRooms.map((room: MeetingRoom, index: number) => (
        <Room id={room.id} onClick={meetingRoomClickHandler} bgColor={room.color} key={room.id}>
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

  function meetingRoomClickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    console.log(event.currentTarget.id);
  }
};

export default withApollo(MeetingRooms);
