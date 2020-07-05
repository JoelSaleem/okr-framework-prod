import ApolloClient, { Operation } from "apollo-boost";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme, appThemes, useTheme } from "../themes";
import { ApolloProvider } from "@apollo/react-hooks";

export const LOCAL_STORAGE_TOKEN_KEY = "OKR_LS_TOKEN";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  request: (operation: Operation) => {
    if (typeof window === "undefined") {
      return;
    }
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

const GlobalStyle = createGlobalStyle`
    body {
        height: 98%;
        background-color: ${function (props: { theme: Theme }) {
          return props.theme.BackgroundMain;
        }};
        color: ${function (props: { theme: Theme }) {
          return props.theme.TextColour;
        }};
        overflow-y: auto;
        font-family: Camphor, Open Sans, Segoe UI, sans-serif;
    }

    html {
        height: 100%;
    }

    #__next {
        height: 100%;
    }
`;

export default ({ Component, pageProps }) => {
  const [idx, switchTheme] = useTheme();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={appThemes[idx]}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};
