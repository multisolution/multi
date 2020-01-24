import {NextPage, NextPageContext} from "next";
import {WithApollo, withApollo} from "../lib/apollo";
import Layout from "../components/layout";
import {withUser, WithUser} from "../lib/check-logged-in";
import {Container, Section, TitlePage} from "../components/global-style";
import React, {FC, useState} from "react";
import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {ServiceOrder} from "../lib/models";
import {Align, Column, Expanded, Row} from "../components/grid";
import styled, {css} from "styled-components";
import {Checkbox} from "../components/form";
import Loading from "../components/loading";

const ServiceOrders: NextPage<WithUser> = ({user}) => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);

  const dayOrders = useQuery(
    gql`
      query AllOrders {
        orders {
          id
          meeting {
            room {
              roomNumber
              color
            }
          }
          requests {
            service {
              title
              id
            }
            total
          }
          fulfilled
        }
      }
    `
  );

  const serviceOrdered = useSubscription<{ serviceOrdered: ServiceOrder }>(
    gql`
      subscription {
        serviceOrdered {
          id
        }
      }
    `,
    {
      onSubscriptionData(opts) {
        if (opts.subscriptionData.data) {
          dayOrders.refetch();
        }
      }
    }
  );

  if (!dayOrders.data) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Section>
        <Container>
          <TitlePage>Serviços</TitlePage>
          <Column>
            {dayOrders.data.orders.map((order: ServiceOrder) => (
              <Tile order={order} callBack={() => dayOrders.refetch()} />
            ))}
          </Column>
        </Container>
      </Section>
    </Layout>
  );
};

const StyledTile = styled.div<{ roomColor: string }>`
  border: 1px solid ${props => props.roomColor};
  border-left-width: ${props => props.theme.space * 5}px;
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.space * 4}px;

  .room-name {
    font-size: 42px;
    font-weight: bold;
    color: #333;
  }
`;

const Tile: FC<{ order: ServiceOrder; callBack: () => void }> = ({ order, callBack }) => {
  const [deliveredOrder] = useMutation(
    gql`
      mutation OrderedService($input: String) {
        delivered(orderId: $input)
      }
    `
  );

  async function onCheckboxClick() {
    const result = await deliveredOrder({
      variables: {
        input: order.id
      }
    });

    if (result.data.delivered) {
      callBack();
    }
  }

  return (
    <StyledTile roomColor={order.meeting.room.color}>
      <Row
        decoration={css`
          opacity: ${order.fulfilled ? 0.5 : 1};
        `}
        mainAxis={Align.Center}
      >
        <Expanded>
          <div className="room-name">Sala {order.meeting.room.roomNumber}</div>
          <table>
            {order.requests.map(request => (
              <tr>
                <td style={{fontSize: "40px", fontWeight: "bold"}}>{request.total} X</td>
                <img src={`/assets/img/services/${request.service.id}.png`} alt={request.service.title}/>
              </tr>
            ))}
          </table>
        </Expanded>
        <Checkbox checked={order.fulfilled} onClick={onCheckboxClick} />
      </Row>
    </StyledTile>
  );
};

ServiceOrders.getInitialProps = async (context: NextPageContext & WithApollo): Promise<WithUser> => {
  return await withUser(context);
};

export default withApollo(ServiceOrders);
