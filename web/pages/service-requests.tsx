import {NextPage, NextPageContext} from "next";
import {WithApollo, withApollo} from "../lib/apollo";
import Layout from "../components/layout";
import {withUser, WithUser} from "../lib/check-logged-in";
import {Container, Section, TitlePage} from "../components/global-style";
import React from "react";
import {useSubscription} from "@apollo/react-hooks";
import gql from "graphql-tag";
import Whoops from "../components/whoops";
import {ServiceRequest} from "../lib/models";

const ServiceRequests: NextPage<WithUser> = ({user}) => {
  const serviceRequested = useSubscription<{ serviceRequested: ServiceRequest[] }>(gql`
      subscription ServiceRequested {
          serviceRequested {
              room {
                  roomNumber
              }
              service {
          title
              }
              total
          }
      }
  `);

  if (serviceRequested.error) {
    console.error(serviceRequested.error);
    return <Whoops/>;
  }

  return (
    <Layout user={user}>
      <Section>
        <Container>
          <TitlePage>Serviços</TitlePage>
          {serviceRequested.data && serviceRequested.data.serviceRequested.length}
        </Container>
      </Section>
    </Layout>
  );
};

ServiceRequests.getInitialProps = async (context: NextPageContext & WithApollo): Promise<WithUser> => {
  return await withUser(context.apolloClient);
};

export default withApollo(ServiceRequests);
