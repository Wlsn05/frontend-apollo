import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//import { Children } from "react";

// Configuración del cliente apollo
const client = new ApolloClient({
  uri: 'https://sistemagestionpresupuestal.onrender.com/graphql',
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)