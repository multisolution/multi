import { NextPage, NextPageContext } from "next";
import { withApollo, WithApollo } from "../lib/apollo";
import { User, MeetingRoom, Role, Service } from "../lib/models";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Layout from "../components/layout";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import { Section } from "../components/global-style";
import { Container } from "next/app";
import ListRooms from "../components/list-rooms";
import Loading from "../components/loading";
import styled, { css } from "styled-components";
import { Column, Row } from "../components/grid";
import Button from "../components/button";

type ButtonProps = {
  backgroundColor: string;
};
const RoomContainer = styled.div<ButtonProps>`
  background-color: ${props => props.backgroundColor};
  border: none;
  min-height:300px
  border-radius: ${props => props.theme.borderRadius}px;
`;

type CreateUserProps = {
  user: User;
};
const ServiceViwer: NextPage<CreateUserProps> = ({ user }) => {
  const getServices = useQuery(
    gql`
      query Services {
        services {
          title
          id
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

  if (!roomsQuery.data) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Section>
        <Column
          decoration={css`
            width: 100%;
            height: 100%;
          `}
        >
          {roomsQuery.data.meetingRooms.map(r => room(r))}
        </Column>
      </Section>
    </Layout>
  );

  function renderService() {
    console.log(getServices.data.services);
    return getServices.data.services.map((service: any) => {
      return (
        <Column>
          <span>{service.title}</span>
          <img style={{ maxWidth: "80px" }} src={`/assets/img/services/${service.id}.png`} />
        </Column>
      );
    });
  }

  function room(room: MeetingRoom) {
    return <RoomContainer backgroundColor={room.color}>{renderService()}</RoomContainer>;
  }
};

ServiceViwer.getInitialProps = async (context: NextPageContext & WithApollo) => {
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

export default withApollo(ServiceViwer);
