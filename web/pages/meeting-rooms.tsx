import { NextPage, NextPageContext } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import { WithApollo, withApollo } from "../lib/apollo";
import Calendar from "../components/calendar";
import Modal from "../components/modal";
import NewMeetingForm, { NewMeetingRoomFormProps } from "../components/new-meeting-form";
import { MeetingRoom } from "../lib/models";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Whoops from "../components/whoops";
import Loading from "../components/loading";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";

const MeetingRooms: NextPage = () => {
  const [modal, setModal] = useState(false);
  const [meetingFormProps, setMeetingFormProps] = useState<NewMeetingRoomFormProps>({ rooms: [] });

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

  if (roomsQuery.error || (roomsQuery.data === undefined && !roomsQuery.loading)) {
    console.error("Error querying rooms");
    return <Whoops />;
  }

  if (roomsQuery.loading || roomsQuery.data === undefined) {
    return <Loading />;
  }

  function onTimeGroupClick(initialDate: Date, initialTime: string) {
    setMeetingFormProps({
      ...meetingFormProps,
      initialDate,
      initialTime
    });

    setModal(true);
  }

  function onNewMeetingSubmit(meetingId: string) {
    console.info(`New meeting created ${meetingId}`);
    setModal(false);
  }

  return (
    <Layout>
      <Calendar rooms={roomsQuery.data.meetingRooms} onTimeGroupClick={onTimeGroupClick} />
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <NewMeetingForm {...meetingFormProps} rooms={roomsQuery.data.meetingRooms} onSubmit={onNewMeetingSubmit} />
      </Modal>
    </Layout>
  );
};

MeetingRooms.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const user = await checkLoggedIn(context.apolloClient);

  if (!user) {
    redirect(context, "/signin");
  }

  return { user };
};

export default withApollo(MeetingRooms);
