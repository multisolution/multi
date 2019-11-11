import { NextPage } from "next";
import React, { useState } from "react";
import { withApollo } from "../lib/apollo";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/layout";
import { Container, Section, ListElement } from "../components/global-style";
import { MeetingRoom } from "../lib/models";
import { Column } from "../components/grid";
import Button from "../components/button";
import Modal from "../components/modal";
import RoomDetails from "../components/room-details";
import meetingRooms from "./meeting-rooms";

const ListRooms: NextPage = () => {
  const [modal, setModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState();
  const roomsQuery = useQuery<{ meetingRooms: MeetingRoom[] }>(
    gql`
      query Rooms {
        meetingRooms {
          id
          roomNumber
          description
        }
      }
    `
  );

  function renderRooms() {
    if (roomsQuery.data) {
      return roomsQuery.data.meetingRooms.map((room: MeetingRoom, index: number) => (
        <Button
          onClick={() => {
            setCurrentRoom(room);
            setModal(true);
          }}
        >
          <div key={index} style={{ display: "flex", margin: "flex-start", alignSelf: "center", flexDirection: "row" }}>
            <ListElement>{room.id}</ListElement>
          </div>
        </Button>
      ));
    }
  }

  return (
    <>
      <Layout>
        <Section>
          <Container>
            <Column>{renderRooms()}</Column>
            <Modal isOpen={modal} onClose={() => setModal(false)}>
              <RoomDetails room={currentRoom} />
            </Modal>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default withApollo(ListRooms);
