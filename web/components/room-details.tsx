import React, {FunctionComponent} from "react";
import {MeetingRoom} from "../lib/models";
import {Column} from "./grid";

type Props = {
  room: MeetingRoom;
};

const RoomDetails: FunctionComponent<Props> = ({room}) => {
  return (
    <Column>
      <img src="/assets/img/rooms/generic_room.jpg" alt={`Foto da sala ${room.roomNumber}`}/>
      <span>{room.description}</span>
    </Column>
  );
};

export default RoomDetails;
