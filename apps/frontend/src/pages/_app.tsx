import Head from "next/head";
import { AppProps } from "next/app";
// import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/globals.css";

import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {


  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  );
}
