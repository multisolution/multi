import React, {FormEvent, FunctionComponent} from "react";
import {useMutation} from "@apollo/react-hooks";
import {Meeting, MeetingInput, MeetingRoom} from "../lib/models";
import gql from "graphql-tag";
import {Column} from "./grid";
import {Input, Select} from "./form";
import Button from "./button";

export type NewMeetingRoomFormProps = {
  rooms: MeetingRoom[];
  initialDate?: Date;
  initialTime?: string;
  onSubmit?: (meetingId: string) => void;
}

const NewMeetingForm: FunctionComponent<NewMeetingRoomFormProps> = ({rooms, initialDate, initialTime, onSubmit: submitDelegate}) => {
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

    if (typeof roomId !== "string") {
      return;
    }

    const input: MeetingInput = {
      roomId,
      startsAt: new Date(`${data.get("date")} ${data.get("start_time")}`),
      endsAt: new Date(`${data.get("date")} ${data.get("end_time")}`)
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
    <div>
      <h1>Nova reunião</h1>

      <form role="form" onSubmit={onSubmit}>
        <Column>
          <Column>{error && error.graphQLErrors.map(error => <span>{error.message}</span>)}</Column>
          <Select name="room_id">
            {rooms.map(meetingRoom => (
              <option key={`room-${meetingRoom.id}`} value={meetingRoom.id}>
                {meetingRoom.roomNumber}
              </option>
            ))}
          </Select>
          <Input type="date" name="date" value={initialDate && initialDate.toISOString().split('T')[0]}/>
          <Input type="time" name="start_time" value={initialTime}/>
          <Input type="time" name="end_time"/>
          <Button type="submit" loading={loading}>
            Agendar
          </Button>
        </Column>
      </form>
    </div>
  );
};

export default NewMeetingForm;
