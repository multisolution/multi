import {useMutation, useQuery} from "@apollo/react-hooks";
import {NextPage, NextPageContext} from "next";
import React, {FC, FormEvent, useState} from "react";
import {Container, Section} from "../components/global-style";
import Layout from "../components/layout";
import {Column, Row} from "../components/grid";
import {WithApollo, withApollo} from "../lib/apollo";
import gql from "graphql-tag";
import {Meeting, Service, ServiceRequestInput} from "../lib/models";
import {withUser, WithUser} from "../lib/check-logged-in";
import styled, {css} from "styled-components";
import Modal from "../components/modal";
import Button from "../components/button";
import AlertMessage from "../components/alert-message";
import Stepper from "../components/stepper";
import moment from "moment";

const StyleTh = styled.th`
  padding: 5px 50px;
`;

const MyMeetings: NextPage<WithUser> = ({user}) => {
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  const [requestService, {data: requestServiceData}] = useMutation<{ requestService: boolean },
    { inputs: ServiceRequestInput[] }>(
    gql`
        mutation RequestService($inputs: [ServiceRequestInput]!) {
            requestService(inputs: $inputs)
        }
    `
  );

  const servicesQuery = useQuery<{ services: Service[] }>(
    gql`
      query Services {
        services {
          title
          id
        }
      }
    `
  );

  const meetingsQuery = useQuery<{ myMeetings: Meeting[] }>(
    gql`
        query MyMeetings {
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

  async function submitRequestService(inputs: ServiceRequestInput[]) {
    const result = await requestService({
      variables: {
        inputs
      }
    });

    if (result.data && result.data.requestService) {
      setMeeting(null);
    }
  }

  return (
    <Layout user={user}>
      <Section>
        <Container style={{display: "flex", justifyContent: "center"}}>
          <ModalDelegate
            services={(servicesQuery.data && servicesQuery.data.services) || []}
            onClose={() => setMeeting(null)}
            meeting={meeting}
            onSubmit={submitRequestService}
          />
          <Column>
            <h1>Minhas reuniões</h1>
            <MeetingsList meetings={(meetingsQuery.data && meetingsQuery.data.myMeetings) || []} onClick={setMeeting}/>
          </Column>
        </Container>
      </Section>
      <AlertMessage
        title="Serviço solicitado com sucesso"
        messageType="success"
        isOpen={requestServiceData && requestServiceData.requestService}
      />
    </Layout>
  );
};

type ModalDelegateProps = {
  meeting: Meeting | null;
  onClose: () => void;
  onSubmit: (inputs: ServiceRequestInput[]) => void;
  services: Service[];
};

const ModalDelegate: FC<ModalDelegateProps> = ({onSubmit: submitDelegate, meeting, onClose, services}) => {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (meeting === null) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const inputs = Array.from(data)
      .map<ServiceRequestInput>(keyValue => {
        return {
          serviceId: keyValue[0],
          total: parseInt(keyValue[1].valueOf().toString()),
          roomId: meeting.room.id
        };
      })
      .filter(input => input.total > 0);

    submitDelegate(inputs);
  }

  return (
    <Modal title="Detalhes da reunião" isOpen={meeting !== null} onClose={onClose}>
      <Column
        decoration={css`
          width: 50%;
        `}
      >
        <span>
          <b>Data:</b> {meeting && moment(meeting.startsAt).format("DD/MM")}
        </span>
        <span>
          <b>Hora início:</b> {meeting && moment(meeting.startsAt).format("HH:mm")}
        </span>
        <span>
          <b>Hora fim:</b> {meeting && moment(meeting.endsAt).format("HH:mm")}
        </span>

        <label style={{fontSize: "30px"}}>Solicitar serviços</label>
        <Row
          decoration={css`
            flex-wrap: wrap;
            width: 50%;
          `}
        >
          <form onSubmit={onSubmit}>
            {services.map(service => (
              <Column
                decoration={css`
                  padding: 10px 30px 10px 0;
                `}
                key={`service-${service.id}`}
              >
                <label>{service.title}</label>
                <Stepper name={service.id}/>
              </Column>
            ))}

            <Button type="submit">Solictar</Button>
          </form>
        </Row>
      </Column>
    </Modal>
  );
};

type MeetingsListProps = {
  meetings: Meeting[];
  onClick: (meeting: Meeting) => void;
};

const MeetingsList: FC<MeetingsListProps> = ({meetings, onClick}) => {
  if (meetings.length === 0) {
    return <span>Você não possui nenhuma reunião agendada!</span>;
  }

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
      {meetings.map(meeting => (
        <tr key={meeting.id}>
          <th>{new Date(meeting.startsAt).toLocaleDateString()}</th>
          <th>{new Date(meeting.startsAt).toLocaleTimeString()}</th>
          <th>{new Date(meeting.endsAt).toLocaleTimeString()}</th>
          <th style={{backgroundColor: meeting.room.color}}>{meeting.room.roomNumber}</th>
          <th>
            <Button onClick={() => onClick(meeting)}>Opções</Button>
          </th>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

MyMeetings.getInitialProps = async (context: NextPageContext & WithApollo) => {
  return await withUser(context);
};

export default withApollo(MyMeetings);
