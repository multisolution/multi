import {NextPage, NextPageContext} from "next";
import React, {useState} from "react";
import Layout from "../components/layout";
import {WithApollo, withApollo} from "../lib/apollo";
import Calendar from "../components/calendar";
import Modal from "../components/modal";
import NewMeetingForm, {NewMeetingRoomFormProps} from "../components/new-meeting-form";
import {Calendar as CalendarModel, MeetingRoom, Role, User} from "../lib/models";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import Whoops from "../components/whoops";
import Loading from "../components/loading";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import ListRooms from "../components/list-rooms";
import {Container, Section} from "../components/global-style";
import moment, {Moment} from "moment";
import {dateFormat} from "../lib/misc";

type MeetingRoomsProps = {
  user: User;
};

const MeetingRooms: NextPage<MeetingRoomsProps> = ({ user }) => {
  const [modal, setModal] = useState(false);
  const [meetingFormProps, setMeetingFormProps] = useState<NewMeetingRoomFormProps>({ rooms: [] });
  const [startDate, setStartDate] = useState<Moment>(moment());

  const calendarQuery = useQuery<{ calendar: CalendarModel[] }>(
    gql`
        query calendar($from: DateTime, $to: DateTime) {
            calendar(from: $from, to: $to) {
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
    `,
    {
      variables: {
        from: startDate.format(dateFormat)
      }
    }
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

  if (calendarQuery.error) {
    console.error("Error querying calendar", calendarQuery.error);
    return <Whoops />;
  }

  if (roomsQuery.error) {
    console.error("Error querying rooms");
    console.error(roomsQuery.error);
    return <Whoops />;
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

  function onCalendarPrevClick() {
    setStartDate(startDate.subtract(1, 'week'));
    calendarQuery.refetch({from: startDate.format(dateFormat)});
  }

  function onCalendarNextClick() {
    setStartDate(startDate.add(1, 'week'));
    calendarQuery.refetch({from: startDate.format(dateFormat)});
  }

  return (
    <Layout user={user}>
      <Section>
        <Container>
          <div style={{ display: "flex", justifyContent: "center", paddingBottom: "40px" }}>
            {!roomsQuery.data || roomsQuery.loading ? <Loading/> :
              <ListRooms rooms={roomsQuery.data.meetingRooms}/>
            }
          </div>
          <Calendar
            isLoading={calendarQuery.loading}
            calendar={(calendarQuery.data && calendarQuery.data.calendar) || []}
            onTimeGroupClick={onTimeGroupClick}
            onPrevClick={onCalendarPrevClick}
            onNextClick={onCalendarNextClick}
          />
        </Container>
      </Section>
      <Modal title="Nova reunião" isOpen={modal} onClose={() => setModal(false)}>
        <NewMeetingForm
          {...meetingFormProps}
          rooms={(roomsQuery.data && roomsQuery.data.meetingRooms) || []}
          onSubmit={onNewMeetingSubmit}
          onCancel={() => setModal(false)}
        />
      </Modal>
    </Layout>
  );
};

MeetingRooms.getInitialProps = async (context: NextPageContext & WithApollo) => {
  const user = await checkLoggedIn(context.apolloClient);

  if (!user) {
    redirect(context, "/signin");
    return {
      user: {
        id: "",
        email: "",
        role: Role.ADMINISTRATOR
      }
    };
  }

  return { user };
};

export default withApollo(MeetingRooms);
