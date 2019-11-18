import { useQuery } from "@apollo/react-hooks";
import { NextPage, NextPageContext } from "next";
import React, { useState } from "react";
import { Container, Section, ListElement } from "../components/global-style";
import Layout from "../components/layout";
import { Column, Row } from "../components/grid";
import { WithApollo, withApollo } from "../lib/apollo";
import gql from "graphql-tag";
import { Role, User, Meeting, Service } from "../lib/models";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import styled from "styled-components";
import Modal from "../components/modal";
import Button from "../components/button";

type CreateUserProps = {
  user: User;
};
const MyMeetings: NextPage<CreateUserProps> = ({ user }) => {
  const StyleTh = styled.th`
    padding: 5px 50px;
  `;

  const allServices = [
    {
      label: "Café",
      icon: "delete",
      total: 0
    },
    {
      label: "Água",
      icon: "delete",
      total: 0
    },
    {
      label: "Chá",
      icon: "delete",
      total: 0
    },
    {
      label: "Pão de queijo",
      icon: "delete",
      total: 0
    }
  ];

  const [services, setServices] = useState<Array<Service>>(allServices);

  const [modal, setModal] = useState(false);
  const [meeting, setMeeting] = useState<Meeting>();
  const getMeetings = useQuery(
    gql`
      query AllUsers {
        myMeetings {
          id
          room {
            id
            roomNumber
            color
          }
          title
          startsAt
          endsAt
          status
        }
      }
    `
  );

  return (
    <>
      <Layout user={user}>
        <Section>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            {renderModal()}
            <Column>
              <h1>Minhas reuniões</h1>
              {renderMeetingsList()}
            </Column>
          </Container>
        </Section>
      </Layout>
    </>
  );

  function renderModal() {
    return (
      <Modal title="Detalhes da reunião" isOpen={modal} onClose={() => setModal(false)}>
        <Column>
          <span>
            <b>Data: </b>
            {meeting ? new Date(meeting.startsAt).toLocaleDateString() : ""}
          </span>
          <span>
            <b>Hora início: </b> {meeting ? new Date(meeting.startsAt).toLocaleTimeString() : ""}
          </span>
          <span>
            <b>Hora fim: </b> {meeting ? new Date(meeting.endsAt).toLocaleTimeString() : ""}
          </span>
          <h1>Solicitar serviços</h1>
          {renderService()}
          <Button onClick={callServices}>Solictar</Button>
        </Column>
      </Modal>
    );
  }

  function callServices(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (meeting) {
      console.log("Solicitar pra sala número: " + meeting.room.roomNumber);
      services.map(service => {
        if (service.total <= 0) {
          return;
        } else {
          console.log(`${service.total} ${service.label}(s)`);
          clearServices();
        }
      });
    }
  }

  function clearServices() {
    const nservices = [...services];
    for (var key in nservices) {
      nservices[key].total = 0;
    }
    setServices(nservices);
  }

  function renderService() {
    console.log("renderService");
    return services.map(service => (
      <Column>
        <Row>
          <label>{service.label}</label>
          <img style={{ width: "20px" }} src="/assets/img/delete.svg" />
        </Row>

        <Row>
          <Button
            onClick={async () => {
              const nservices = [...services];
              if (nservices[services.indexOf(service)].total - 1 >= 0) {
                nservices[services.indexOf(service)].total--;
                setServices(nservices);
              }
            }}
          >
            <span style={{ fontSize: "30px" }}> - </span>
          </Button>
          <span>{services[services.indexOf(service)].total}</span>
          <Button
            onClick={async () => {
              const nservices = [...services];
              nservices[services.indexOf(service)].total++;
              setServices(nservices);
            }}
          >
            <span style={{ fontSize: "30px" }}> + </span>
          </Button>
        </Row>
      </Column>
    ));
  }

  function renderMeetingsList() {
    if (getMeetings.data && getMeetings.data.myMeetings.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <StyleTh>Data</StyleTh>
              <StyleTh>Hora início</StyleTh>
              <StyleTh>hora fim</StyleTh>
              <StyleTh>Número da sala</StyleTh>
              <StyleTh>Opções</StyleTh>
            </tr>
          </thead>
          <tbody>
            {getMeetings.data.myMeetings.map((meeting: Meeting) => (
              <tr key={"TR meetings" + getMeetings.data.myMeetings.indexOf(meeting)}>
                <th>{new Date(meeting.startsAt).toLocaleDateString()}</th>
                <th>{new Date(meeting.startsAt).toLocaleTimeString()}</th>
                <th>{new Date(meeting.endsAt).toLocaleTimeString()}</th>
                <th style={{ backgroundColor: meeting.room.color }}>{meeting.room.roomNumber}</th>
                <th>
                  <Button
                    onClick={() => {
                      setMeeting(meeting);
                      setModal(true);
                    }}
                  >
                    Opções
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <span>Você não possue nenhuma reunião agendada!</span>;
    }
  }
};

MyMeetings.getInitialProps = async (context: NextPageContext & WithApollo) => {
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

export default withApollo(MyMeetings);
