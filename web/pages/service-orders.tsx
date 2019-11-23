import {NextPage, NextPageContext} from "next";
import {WithApollo, withApollo} from "../lib/apollo";
import Layout from "../components/layout";
import {withUser, WithUser} from "../lib/check-logged-in";
import {Container, Section, TitlePage} from "../components/global-style";
import React, {FC, useState} from "react";
import {useSubscription} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {ServiceOrder} from "../lib/models";
import {Align, Column, Expanded, Row} from "../components/grid";
import styled from "styled-components";
import {Checkbox} from "../components/form";

const ServiceOrders: NextPage<WithUser> = ({user}) => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);

  const serviceOrdered = useSubscription<{ serviceOrdered: ServiceOrder }>(
    gql`
        subscription {
            serviceOrdered {
                meeting {
                    room {
                        roomNumber
                        color
                    }
                }
                requests {
                    service {
                        title
                    }
                    total
                }
                fulfilled
            }
        }
    `,
    {
      onSubscriptionData(opts) {
        if (opts.subscriptionData.data) {
          setOrders([...orders, opts.subscriptionData.data.serviceOrdered]);
        }
      }
    }
  );

  return (
    <Layout user={user}>
      <Section>
        <Container>
          <TitlePage>Serviços</TitlePage>
          <Column>
            {orders.map(order => (
              <Tile order={order}/>
            ))}
          </Column>
        </Container>
      </Section>
    </Layout>
  );
};

const StyledTile = styled.div<{ roomColor: string }>`
  border: 1px solid ${props => props.roomColor};
  border-left-width: ${props => props.theme.space * 3}px;
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.space * 4}px;

  .room-name {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

const Tile: FC<{ order: ServiceOrder }> = ({order}) => {
  function onCheckboxClick() {
    console.log("test");
  }

  return (
    <StyledTile roomColor={order.meeting.room.color}>
      <Row mainAxis={Align.Center}>
        <Expanded>
          <div className="room-name">Sala {order.meeting.room.roomNumber}</div>
          <table>
            {order.requests.map(request => (
              <tr>
                <td>{request.total}</td>
                <td>{request.service.title}</td>
              </tr>
            ))}
          </table>
        </Expanded>
        <Checkbox checked={order.fulfilled} onClick={onCheckboxClick}/>
      </Row>
    </StyledTile>
  );
};

ServiceOrders.getInitialProps = async (context: NextPageContext & WithApollo): Promise<WithUser> => {
  return await withUser(context);
};

export default withApollo(ServiceOrders);
