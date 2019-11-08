import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import { withApollo } from "../lib/apollo";
import Calendar from "../components/calendar";
import Modal from "../components/modal";
import NewMeetingForm from "../components/new-meeting-form";
import { Time } from "../lib/models";

const MeetingRooms: NextPage = () => {
  const [modal, setModal] = useState(false);

  function onCellClick(times: Time[]) {
    console.log(times);
    setModal(true);
  }

  return (
    <>s
      <Layout>
        <Calendar onCellClick={onCellClick} />
        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <NewMeetingForm />
        </Modal>
      </Layout>
    </>
  );
};

export default withApollo(MeetingRooms);
