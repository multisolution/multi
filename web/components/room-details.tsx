import React, { FormEvent, FunctionComponent } from "react";
import { MeetingRoom } from "../lib/models";
import { Column } from "./grid";
import Loading from "./loading";

type Props = {
  room: MeetingRoom;
};

const RoomDetails: FunctionComponent<Props> = ({ room: room }) => {
  if (room) {
    return (
      <Column>
        <h1>Detalhes da sala {room.roomNumber} </h1>
        <img src="/assets/img/rooms/generic_room.jpg"></img>
        <span>{room.description}</span>
      </Column>
    );
  } else {
    return <Loading />;
  }
};

export default RoomDetails;
