import { Doc } from "@/utils/repo";
import {
  AutomergeUrl,
  DocHandle,
  isValidAutomergeUrl,
} from "@automerge/automerge-repo";
import {
  useBootstrap,
  useDocument,
  useRepo,
} from "@automerge/automerge-repo-react-hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { next as A } from "@automerge/automerge";

export default function Session() {
  const sessionID = useRouter().query.sessionId as string;

  const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  const repo = useRepo();

  useEffect(() => {
    let handle: DocHandle<Doc>;

    const createDoc = () => {
      const doc = repo.create<Doc>();
      doc.change((d) => (d.count = new A.Counter()));
      return doc;
    };

    handle = isValidAutomergeUrl(sessionID)
      ? repo.find<Doc>(sessionID)
      : createDoc();
    console.info("handle", handle);

    handle.whenReady().then(() => {
      console.info("ready");
      setDocUrl(handle.url);
    });
  }, []);

  const [doc, changeDoc] = useDocument<Doc>(docUrl);

  const increment = () => {
    changeDoc((d) => d.count?.increment(1));
  };
  return (
    <div>
      <div>
        <div>count: {doc?.count?.value ?? 0}</div>
        <button onClick={increment}>hello</button>
      </div>
    </div>
  );
}
