// import 'antd/dist/antd.css'
import "antd/dist/antd.dark.css";
import "tailwindcss/tailwind.css";
import "../styles/common.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
};

export default MyApp;
