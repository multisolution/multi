import React, {FormEvent, FunctionComponent, useContext} from "react";
import {useMutation} from "@apollo/react-hooks";
import {Meeting, MeetingInput, MeetingRoom} from "../lib/models";
import gql from "graphql-tag";
import {Align, Column, Row} from "./grid";
import {Input, Select} from "./form";
import Button, {ButtonSkin} from "./button";
import {MdEdit, MdRoom, MdTimer, MdTimerOff, MdToday} from "react-icons/md";
import {ThemeContext} from "styled-components";

export type NewMeetingRoomFormProps = {
  rooms: MeetingRoom[];
  initialDate?: Date;
  initialTime?: string;
  onSubmit?: (meetingId: string) => void;
  onCancel?: () => void;
}

const NewMeetingForm: FunctionComponent<NewMeetingRoomFormProps> = ({onCancel, rooms, initialDate, initialTime, onSubmit: submitDelegate}) => {

  const theme = useContext(ThemeContext);

    const [createMeeting, {loading, error}] = useMutation<{ createMeeting: Meeting }, { input: MeetingInput }>(gql`
      mutation CreateMeeting($input: MeetingInput!) {
        createMeeting(input: $input) {
          id
        }
      }
    `);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const roomId = data.get("room_id");
    const title = data.get('title');

    if (typeof roomId !== "string" || typeof title !== "string") {
      return;
    }

    const input: MeetingInput = {
      title,
      roomId,
      startsAt: `${data.get("date")} ${data.get("start_time")}:00`,
      endsAt: `${data.get("date")} ${data.get("end_time")}:00`
    };

    const result = await createMeeting({
      variables: {
        input
      }
    });

    if (result.data && submitDelegate) {
      submitDelegate(result.data.createMeeting.id);
    }
  }

  return (
      <form role="form" onSubmit={onSubmit}>
        <Column>
          <Column>{error && error.graphQLErrors.map(error => <span>{error.message}</span>)}</Column>
          <Row mainAxis={Align.Center} space={20}>
            <MdRoom size={24} color={theme.colors.dark}/>
            <Select name="room_id" required={true}>
              {rooms.map(meetingRoom => (
                <option key={`room-${meetingRoom.id}`} value={meetingRoom.id}>
                  Sala {meetingRoom.roomNumber}
                </option>
              ))}
            </Select>
          </Row>
          <Row mainAxis={Align.Center} space={20}>
            <MdEdit size={24} color={theme.colors.dark}/>
            <Input type="text" name="title" placeholder="Título" required={true} autoFocus={true}/>
          </Row>
          <Row mainAxis={Align.Center} space={20}>
            <MdToday size={24} color={theme.colors.dark}/>
            <Input type="date" name="date" value={initialDate && initialDate.toISOString().split('T')[0]}
                   required={true}/>
          </Row>
          <Row space={20}>
            <Row mainAxis={Align.Center} space={20} fill={true}>
              <MdTimer size={24} color={theme.colors.dark}/>
              <Input type="time" name="start_time" value={initialTime} required={true}/>
            </Row>
            <Row mainAxis={Align.Center} space={20} fill={true}>
              <MdTimerOff size={24} color={theme.colors.dark}/>
              <Input type="time" name="end_time" required={true}/>
            </Row>
          </Row>
          <Row crossAxis={Align.End} space={20}>
            <Button type="reset" skin={ButtonSkin.Text} onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={loading}>
              Agendar
            </Button>
          </Row>
        </Column>
      </form>
  );
};

export default NewMeetingForm;
