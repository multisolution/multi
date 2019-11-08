import {NextPage} from "next";
import React from "react";
import Layout from "../components/layout";
import {Container, Section} from "../components/global-style";
import {withApollo} from "../lib/apollo";
import NewMeetingForm from "../components/new-meeting-form";


const NewMeeting: NextPage = () => {
  return (
    <Layout>
      <Section>
        <Container>
          <NewMeetingForm/>
        </Container>
      </Section>
    </Layout>
  );
};

export default withApollo(NewMeeting);
