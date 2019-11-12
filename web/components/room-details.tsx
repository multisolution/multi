import React, { FormEvent, FunctionComponent } from "react";
import { MeetingRoom } from "../lib/models";
import { Column } from "./grid";
import Loading from "./loading";
import { css } from "styled-components";

type Props = {
  room: MeetingRoom;
};

const RoomDetails: FunctionComponent<Props> = ({ room: room }) => {
  if (room) {
    return (
      <Column>
        <img src="/assets/img/rooms/generic_room.jpg"></img>
        <h1>Detalhes da sala {room.roomNumber} </h1>
        <span>{room.description}</span>
      </Column>
    );
  } else {
    return <Loading />;
  }
};

export default RoomDetails;
