import {Role, User} from "./models";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {NormalizedCacheObject} from "apollo-cache-inmemory";
import redirect from "./redirect";
import {NextPageContext} from "next";
import {WithApollo} from "./apollo";

const checkLoggedIn = async (client: ApolloClient<NormalizedCacheObject>): Promise<User | undefined> => {
  const result = await client.query<{ me: User }>({
    query: gql`
        query Me {
            me {
                id
                email
                role
            }
        }
    `
  });

  if (result.data && result.data.me) {
    return result.data.me;
  }

  return undefined;
};

export const withUser = async <P = {}>(context: NextPageContext & WithApollo, props?: P): Promise<P & WithUser> => {
  const user = await checkLoggedIn(context.apolloClient);

  if (!user) {
    redirect(context, '/signin');

    return Object.assign({}, props, {
      user: {
        id: '',
        email: '',
        role: Role.COLLABORATOR,
      }
    });
  }

  return Object.assign({}, props, {user});
};

export type WithUser = {
  user: User;
}

export default checkLoggedIn;
