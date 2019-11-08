import { NextPage } from "next";
import React from "react";
import Layout from "../components/layout";
import { withApollo } from "../lib/apollo";
import Calendar from "../components/calendar";
import Modal from "../components/modal";

const MeetingRooms: NextPage = () => {
  return (
    <>
      <Layout>
        <Calendar />
        <Modal>
          test
        </Modal>
      </Layout>
    </>
  );
};

export default withApollo(MeetingRooms);
