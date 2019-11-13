import {NextPage, NextPageContext} from "next";
import React, {useState} from "react";
import Layout from "../components/layout";
import {WithApollo, withApollo} from "../lib/apollo";
import Calendar from "../components/calendar";
import Modal from "../components/modal";
import NewMeetingForm, {NewMeetingRoomFormProps} from "../components/new-meeting-form";
import {Calendar as CalendarModel, MeetingRoom} from "../lib/models";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import Whoops from "../components/whoops";
import Loading from "../components/loading";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import ListRooms from "../components/list-rooms";
import {Container, Section} from "../components/global-style";

const MeetingRooms: NextPage = () => {
  const [modal, setModal] = useState(false);
  const [meetingFormProps, setMeetingFormProps] = useState<NewMeetingRoomFormProps>({ rooms: [] });
    const calendarQuery = useQuery<{ calendar: CalendarModel[] }>(
      gql`
        query calendar {
          calendar {
            date
            times {
              hour
              meetings {
                id
                room {
                  id
                  color
                }
              }
            }
          }
        }
      `
    );

  const roomsQuery = useQuery<{ meetingRooms: MeetingRoom[] }>(
    gql`
      query Rooms {
        meetingRooms {
          id
          roomNumber
          description
          color
        }
      }
    `
  );


  if (calendarQuery.error || (calendarQuery.data === undefined && !calendarQuery.loading)) {
    console.error("Error querying calendar", calendarQuery.error);
    return <Whoops/>;
  }

  if (calendarQuery.loading || calendarQuery.data === undefined) {
    return <Loading/>;
  }


  if (roomsQuery.error || (roomsQuery.data === undefined && !roomsQuery.loading)) {
    console.error("Error querying rooms");
    console.error(roomsQuery.error);
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

  async function onNewMeetingSubmit(meetingId: string) {
    console.info(`New meeting created ${meetingId}`);
    await calendarQuery.refetch();
    setModal(false);
  }

  return (
    <Layout>
      <Section>
        <Container>
          <div style={{display: "flex", justifyContent: "center", paddingBottom: "40px"}}>
            <ListRooms rooms={roomsQuery.data.meetingRooms}/>
          </div>
          <Calendar
            calendar={calendarQuery.data.calendar}
            onTimeGroupClick={onTimeGroupClick}
          />
        </Container>
      </Section>
      <Modal title="Nova reunião" isOpen={modal} onClose={() => setModal(false)}>
        <NewMeetingForm
          {...meetingFormProps}
          rooms={roomsQuery.data.meetingRooms}
          onSubmit={onNewMeetingSubmit}
          onCancel={() => setModal(false)}
        />
      </Modal>
    </Layout>
  );
};

// MeetingRooms.getInitialProps = async (context: NextPageContext & WithApollo) => {
//   const user = await checkLoggedIn(context.apolloClient);

//   if (!user) {
//     redirect(context, "/signin");
//   }

//   return { user };
// };

export default withApollo(MeetingRooms);
