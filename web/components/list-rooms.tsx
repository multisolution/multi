import React, {FunctionComponent, useState} from "react";
import {MeetingRoom} from "../lib/models";
import {Column, Row} from "./grid";
import Modal from "./modal";
import RoomDetails from "./room-details";
import styled from "styled-components";

type Props = {
  rooms: MeetingRoom[];
};

const ListRooms: FunctionComponent<Props> = ({rooms}) => {
  const [modal, setModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<MeetingRoom>(rooms[0]);

  return (
    <>
      <Row>
        {rooms.map(room => (
          <Column key={`room-${room.id}`}>
            <RoomButton
              backgroundColor={room.color}
              onClick={() => {
                console.log(room.color);
                setCurrentRoom(room);
                setModal(true);
              }}
            />
            <RoomName>Sala {room.roomNumber}</RoomName>
          </Column>
        ))}
      </Row>
      <Modal title={`Sala ${currentRoom.roomNumber}`} isOpen={modal} onClose={() => setModal(false)}>
        <RoomDetails room={currentRoom} />
      </Modal>
    </>
  );
};

type ButtonProps = {
  backgroundColor: string;
};

const RoomName = styled.span`
  color: ${props => props.theme.colors.dark};
  padding: 0 ${props => props.theme.space * 2}px;
`;

const RoomButton = styled.button<ButtonProps>`
  cursor: pointer;
  background-color: ${props => props.backgroundColor};
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

export default ListRooms;
