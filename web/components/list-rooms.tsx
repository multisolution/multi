import React, { useState, FunctionComponent } from "react";
import Layout from "./layout";
import { Section, ListElement } from "./global-style";
import { MeetingRoom } from "../lib/models";
import { Row } from "./grid";
import Button from "./button";
import Modal from "./modal";
import RoomDetails from "./room-details";
import styled from "styled-components";

type Props = {
  rooms: MeetingRoom[];
};

const ListRooms: FunctionComponent<Props> = ({ rooms: rooms }) => {
  const [modal, setModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState();

  function renderRooms() {
    if (rooms) {
      return rooms.map((room: MeetingRoom, index: number) => (
        <RoomButton
          key={"room-button" + rooms.indexOf(room)}
          bgcolor={room.color}
          onClick={() => {
            console.log(room.color);
            setCurrentRoom(room);
            setModal(true);
          }}
        >
          <div key={index} style={{ display: "flex", margin: "flex-start", alignSelf: "center", flexDirection: "row" }}>
            <ListElement>Sala {room.roomNumber}</ListElement>
          </div>
        </RoomButton>
      ));
    }
  }

  return (
    <>
      <Row key={"rooms"}>{renderRooms()}</Row>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <RoomDetails room={currentRoom} />
      </Modal>
    </>
  );
};

export default ListRooms;
type ButtonProps = {
  bgcolor: string;
};

const RoomButton = styled.button<ButtonProps>`
  cursor: pointer;
  background-color: ${props => props.bgcolor};
  border: none;
  min-height: 48px;
  border-radius: ${props => props.theme.borderRadius}px;
  text-transform: uppercase;
  font-weight: bold;
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }
`;
