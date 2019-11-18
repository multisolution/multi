import { useQuery, useMutation } from "@apollo/react-hooks";
import { NextPage, NextPageContext } from "next";
import React, { useState, useEffect } from "react";
import { Container, Section } from "../components/global-style";
import Layout from "../components/layout";
import { Column, Row } from "../components/grid";
import { WithApollo, withApollo } from "../lib/apollo";
import gql from "graphql-tag";
import { Role, User, Meeting, Service, InputServiceRequest } from "../lib/models";
import checkLoggedIn from "../lib/check-logged-in";
import redirect from "../lib/redirect";
import styled from "styled-components";
import Modal from "../components/modal";
import Button from "../components/button";
import AlertMenssage from "../components/alert-menssage";

type CreateUserProps = {
  user: User;
};
const MyMeetings: NextPage<CreateUserProps> = ({ user }) => {
  const StyleTh = styled.th`
    padding: 5px 50px;
  `;

  const [modal, setModal] = useState(false);
  const [meeting, setMeeting] = useState<Meeting>();
  const [serviceRequested, setServiceRequested] = useState(false);
  const [services, setServices] = useState<Array<Service>>([]);

  const [requestService] = useMutation(
    gql`
      mutation RequestService($input: [InputServiceRequest]!) {
        requestService(input: $input)
      }
    `
  );

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

  useEffect(() => {
    getMeetings.refetch();
    setServices(
      getServices.data.services.map((service: any) => {
        return {
          id: service.id,
          label: service.title,
          icon: "delete",
          total: 0
        };
      })
    );
  }, []);

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
      {renderMenssage()}
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

  async function callServices(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (meeting) {
      const args: Array<InputServiceRequest> = [];

      for (var index in services) {
        if (services[index].total > 0) {
          args.push({
            serviceId: services[index].id.toString(),
            roomId: meeting.room.id,
            hostId: user.id,
            total: services[index].total
          });
        }
      }
      if (args.length > 0) {
        console.log(args);
        const result = await requestService({
          variables: {
            input: args
          }
        });
        if (result.data.requestService) {
          setModal(false);
          setServiceRequested(true);
          setTimeout(() => setServiceRequested(false), 1000);
        }
      }
    }
  }

  function renderMenssage() {
    return (
      <AlertMenssage
        title={"Serviço solicitado com sucesso"}
        menssage=""
        typeMenssage="success"
        isOpen={serviceRequested}
      />
    );
  }

  function clearServices() {
    const nservices = [...services];
    for (var key in nservices) {
      nservices[key].total = 0;
    }
    setServices(nservices);
  }

  function renderService() {
    return services.map(service => (
      <Column key={"services map" + services.indexOf(service)}>
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
                nservices[services.indexOf(service)].id = service.id;
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
              nservices[services.indexOf(service)].id = service.id;
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
