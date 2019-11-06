import { NextPage } from "next";
import React from "react";

import Link from "next/link";
import { Container, Section, Room } from "../components/global-style";
import Layout from "../components/layout";
import { Row } from "../components/grid";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MeetingRoom } from "../lib/models";
import { withApollo } from "../lib/apollo";

const MeetingRooms: NextPage = () => {
  const getRooms = useQuery(
    gql`
      query meetingRooms {
        meetingRooms {
          id
          roomNumber
          description
        }
      }
    `
  );

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <Row>{renderTable()}</Row>
          </Container>
        </Section>
      </Layout>
    </>
  );

  function renderTable() {
    if (getRooms.data) {
      return getRooms.data.meetingRooms.map((room: MeetingRoom, index: number) => (
        <Room key={room.id}>{room.roomNumber}</Room>
      ));
    }
  }

  function meetingRoomClickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    console.log("trioa");
  }
};

export default withApollo(MeetingRooms);
