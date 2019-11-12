import React, { FunctionComponent, useState } from "react";
import { ListElement } from "./global-style";
import { MeetingRoom } from "../lib/models";
import { Row, Column } from "./grid";
import Modal from "./modal";
import RoomDetails from "./room-details";
import styled, { css } from "styled-components";

type Props = {
  rooms: MeetingRoom[];
};

const ListRooms: FunctionComponent<Props> = ({ rooms: rooms }) => {
  const [modal, setModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState();

  function renderRooms() {
    if (rooms) {
      return rooms.map((room: MeetingRoom, index: number) => (
        <Column>
          <RoomButton
            key={"room-button" + rooms.indexOf(room)}
            bgcolor={room.color}
            onClick={() => {
              console.log(room.color);
              setCurrentRoom(room);
              setModal(true);
            }}
          ></RoomButton>
          <div key={index} style={{ display: "flex", margin: "flex-start", alignSelf: "center", flexDirection: "row" }}>
            <StyledRoomName>Sala {room.roomNumber}</StyledRoomName>
          </div>
        </Column>
      ));
    }
  }

  return (
    <>
      <Row
        decoration={css`
          align-item: flex-start;
        `}
        key={"rooms"}
      >
        {renderRooms()}
      </Row>
      <Modal title="Sala" isOpen={modal} onClose={() => setModal(false)}>
        <RoomDetails room={currentRoom} />
      </Modal>
    </>
  );
};

export default ListRooms;
type ButtonProps = {
  bgcolor: string;
};

const StyledRoomName = styled.span`
  color: ${props => props.theme.colors["dark"]};
  padding: 0 10px 0 10px;
`;

const RoomButton = styled.button<ButtonProps>`
  cursor: pointer;
  background-color: ${props => props.bgcolor};
  border: none;
  min-height: 38px;
  min-width: 38px;
  border-radius: ${props => props.theme.borderRadius}px;
  text-transform: uppercase;
  font-weight: bold;
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }
`;
