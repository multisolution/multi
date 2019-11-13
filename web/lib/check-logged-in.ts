import { User } from "./models";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

const checkLoggedIn = async (client: ApolloClient<NormalizedCacheObject>): Promise<User | undefined> => {
  const result = await client.query<{ me: User }>({
    query: gql`
      query Me {
        me {
          id
          email
        }
      }
    `
  });
  if (result.data && result.data.me) {
    return result.data.me;
  }

  return undefined;
};

export default checkLoggedIn;
