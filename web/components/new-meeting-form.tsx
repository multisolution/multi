import React, {FormEvent, FunctionComponent} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Meeting, MeetingInput, MeetingRoom} from "../lib/models";
import gql from "graphql-tag";
import {Column} from "./grid";
import {Input, Select} from "./form";
import Button from "./button";

const NewMeetingForm: FunctionComponent = () => {
    const queryResult = useQuery<{ meetingRooms: MeetingRoom[] }>(gql`
        query MeetingRooms {
            meetingRooms {
                id
                roomNumber
            }
        }
    `);

  if (queryResult.error) {
    return <p>Error...</p>;
  }

  if (!queryResult.data) {
    return <p>Loading...</p>;
  }

    const [createMeeting, {loading, error}] = useMutation<{ createMeeting: Meeting }, { input: MeetingInput }>(gql`
        mutation CreateMeeting($input: MeetingInput!) {
            createMeeting(input: $input) {
                id
            }
        }
    `);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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

    createMeeting({
      variables: {
        input
      }
    });
  }

  return (
    <div>
      <h1>Nova reunião</h1>

      <form role="form" onSubmit={onSubmit}>
        <Column>
          <Column>{error && error.graphQLErrors.map(error => <span>{error.message}</span>)}</Column>
          <Select name="room_id">
            {queryResult.data.meetingRooms.map(meetingRoom => (
              <option key={`room-${meetingRoom.id}`} value={meetingRoom.id}>
                {meetingRoom.roomNumber}
              </option>
            ))}
          </Select>
          <Input type="date" name="date"/>
          <Input type="time" name="start_time"/>
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
