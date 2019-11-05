import {NextPage} from "next";
import React from "react";

import Link from "next/link";
import Button from "../components/button";
import {Container, Section} from "../components/global-style";
import Layout from "../components/layout";

const MeetingRooms: NextPage = () => {
  return (
    <>
      <Layout>
        <Section>
          <Container>
            <header>
              <h1>Meeting rooms</h1>
              <Link href="/">
                <Button skin="primary">Home</Button>
              </Link>
            </header>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default MeetingRooms;
