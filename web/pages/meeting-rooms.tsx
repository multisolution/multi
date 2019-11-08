import { NextPage } from "next";
import React from "react";
import { Container, Section, Room } from "../components/global-style";
import Layout from "../components/layout";
import { Row, Column } from "../components/grid";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MeetingRoom } from "../lib/models";
import { withApollo } from "../lib/apollo";
import Calendar from "../components/calendar";
import { CalendarDayBlock } from "../components/calendar-styles";

const MeetingRooms: NextPage = () => {
  return (
    <>
      <Layout>
        <Column>
          <Calendar></Calendar>
        </Column>
      </Layout>
    </>
  );
};

export default withApollo(MeetingRooms);
