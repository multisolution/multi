import {NextPage} from "next";
import React from "react";
import Link from "next/link";
import Button from "../components/button";
import GlobalStyle, {Container, Section} from '../components/global-styled';
import Layout from "../components/layout";


const Index: NextPage = () => {
  return (
    <Layout>
      <Section>
        <Container>
            <header>
              <h1 style={{color:"red"}}>INDEX</h1> 

              <Link href="/meeting-rooms">
              <Button>Home</Button>
            </Link>
            </header>    
          </Container>
      </Section>
    </Layout>
  )
};

export default Index;