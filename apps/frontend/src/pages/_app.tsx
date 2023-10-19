import Head from "next/head";
import { AppProps } from "next/app";
import "/styles/globals.css";

import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/hook/ThemeContext";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { useEffect, useState } from "react";
import { Repo, AutomergeUrl } from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { ErrorProvider } from "@/hook/ErrorContext";
export default function App({ Component, pageProps }: AppProps) {
  const [repo, setRepo] = useState<Repo>();
  //   console.log(repo);

  useEffect(() => {
    if (typeof window !== "undefined" && "indexedDB" in window) {
      console.log("Creating repo");
      const brandNewRepo = new Repo({
        network: [
          new BrowserWebSocketClientAdapter(
            String(process.env.NEXT_PUBLIC_WS_SESSION_URL)
          ),
          new BroadcastChannelNetworkAdapter(),
        ],
        storage: new IndexedDBStorageAdapter(),
      });
      setRepo(brandNewRepo);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <SessionProvider>
      <ErrorProvider>
        <ThemeProvider>
          <RepoContext.Provider value={repo as Repo}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RepoContext.Provider>
        </ThemeProvider>
        </ErrorProvider>
      </SessionProvider>
    </div>
  );
}
