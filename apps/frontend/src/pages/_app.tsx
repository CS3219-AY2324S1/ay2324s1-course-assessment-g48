import Head from "next/head";
import { AppProps } from "next/app";
import "/styles/globals.css";

import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "@/hook/ThemeContext";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@/utils/repo";
import { useEffect, useState } from "react";
import {
  Repo,
  DocHandle,
  isValidAutomergeUrl,
  AutomergeUrl,
} from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { next as A } from "@automerge/automerge";

export default function App({ Component, pageProps }: AppProps) {
  const [repo, setRepo] = useState<Repo>();
  //   console.log(`Initial repo: ${repo}`);

  const [docUrl, setDocUrl] = useState<AutomergeUrl>();

  useEffect(() => {
    if (typeof window !== "undefined" && "indexedDB" in window) {
      console.log("Creating repo");
      const brandNewRepo = new Repo({
        network: [new BroadcastChannelNetworkAdapter()],
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
        <ThemeProvider>
          <RepoContext.Provider value={repo as Repo}>
            <Layout>
              <Component {...pageProps} docUrl={docUrl} />
            </Layout>
          </RepoContext.Provider>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
}
