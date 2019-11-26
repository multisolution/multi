import {NextPage, NextPageContext} from "next";
import {ApolloClient} from "apollo-client";
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import cookie from "cookie";
import {ApolloProvider} from "@apollo/react-common";
import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import {WebSocketLink} from "apollo-link-ws";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import {OperationDefinitionNode} from "graphql";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

type GetToken = () => string | null;

export type WithApollo = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: any;
};

export function withApollo<PageProps>(PageComponent: NextPage<PageProps>, {ssr = true}: { ssr?: boolean } = {}) {
  const WithApollo = (props: WithApollo & PageProps) => {
    const client = props.apolloClient || initApolloClient(props.apolloState, getTokenFromDocument());
    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (context: NextPageContext & WithApollo) => {
      const {AppTree} = context;
      const apolloClient = (context.apolloClient = initApolloClient({}, getTokenFromContext(context)));

      const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(context) : {};

      if (typeof window === "undefined") {
        if (context.res && context.res.finished) {
          return {};
        }

        if (ssr) {
          try {
            const {getDataFromTree} = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            console.error("Error while running `getDataFromTree`", error);
          }
        }

        Head.rewind();
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}

function initApolloClient(initialState: any, getToken: GetToken): ApolloClient<NormalizedCacheObject> {
  if (typeof window === "undefined") {
    return createApolloClient(initialState, getToken);
  }

  if (apolloClient === null) {
    apolloClient = createApolloClient(initialState, getToken);
  }

  return apolloClient;
}

function createApolloClient(initialState: any, getToken: GetToken): ApolloClient<NormalizedCacheObject> {
  const fetchOptions = {};

  const http = new HttpLink({
    uri: process.env.API_URL,
    fetch,
    fetchOptions
  });

  const auth = setContext((request, {headers}) => {
    const token = getToken();

    return {
      headers: {
        ...headers,
        authorization: token === null ? "" : `Bearer ${token}`
      }
    };
  });
  let link = auth.concat(http);


  if (typeof window !== "undefined") {
    const wsLink = new WebSocketLink({
      uri: process.env.WS_URL || 'ws://localhost:8001',
      options: {
        reconnect: true,
      },
    });

    link = split(
      ({query}) => {
        const {kind, operation} = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      link
    )
  }

  return new ApolloClient<NormalizedCacheObject>({
    ssrMode: typeof window === "undefined",
    link,
    cache: new InMemoryCache().restore(initialState)
  });
}

const getTokenFromContext = (context: NextPageContext): GetToken => {
  return () => {
    if (context && context.req) {
      return cookie.parse(context.req.headers.cookie || "").token || null;
    }

    return null;
  };
};

const getTokenFromDocument = (): GetToken => {
  return () => {
    if (typeof window !== "undefined") {
      return cookie.parse(window.document.cookie).token || null;
    }

    return null;
  };
};
