import { BrowserRouter } from "react-router-dom";

import { Footer } from "../src/components/molecules/Footer";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { AppProvider } from "./context/AppProvider";
import { AppRoutes } from "./AppRoutes";
import { NavBar } from "./components/organisms/NavBar";

const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL || "http://localhost:4000",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

const clearClient = () => {
  client.clearStore().then(() => {
    client.resetStore();
  });
};

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppProvider>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
            spacing={0}
          >
            <NavBar clearClient={clearClient} />
            <AppRoutes />
            <Box sx={{ marginTop: "auto" }}>
              <Footer />
            </Box>
          </Stack>
        </AppProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
