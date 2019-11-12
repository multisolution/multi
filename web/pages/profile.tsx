import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Whoops from "../components/whoops";
import Loading from "../components/loading";
import { Column } from "../components/grid";
import Button from "../components/button";
import Modal from "../components/modal";
import ChangePassModal from "../components/change-pass-modal";

const Profile: NextPage = () => {
  const [modal, setModal] = useState(false);

  const meQuery = useQuery(
    gql`
      query me {
        me {
          id
          email
          role
        }
      }
    `
  );

  if (meQuery.error || (meQuery.data === undefined && !meQuery.loading)) {
    console.error("Error querying ME");
    return <Whoops />;
  }

  if (meQuery.loading || meQuery.data === undefined) {
    return <Loading />;
  }

  return (
    <Layout>
      <Column>
        <div style={{ width: "100%" }}>
          <span>{meQuery.data.me.email}</span>
        </div>
        <div style={{ width: "100%" }}>
          <span>{meQuery.data.me.role}</span>
        </div>
        <Button onClick={() => setModal(true)}>Alterar senha</Button>

        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <ChangePassModal />
        </Modal>
      </Column>
    </Layout>
  );
};

export default withApollo(Profile);
