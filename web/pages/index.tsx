import { NextPage } from "next";
import React from "react";
import { Container, Section } from "../components/global-style";
import Layout from "../components/layout";

const Index: NextPage = () => {
  return (
    <Layout>
      <Section>
        <Container>
          <header>
            <h1 style={{ color: "red" }}>INDEX</h1>
            {/* <Link href="/meeting-rooms"></Link> */}
          </header>
        </Container>
      </Section>
    </Layout>
  );
};

export default Index;
