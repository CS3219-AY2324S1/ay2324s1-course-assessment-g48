import useSessionByUid from "@/hook/useSessionByUid";
import useSessionUser from "@/hook/useSessionUser";

export default function SessionsPage() {
  const { sessionUser } = useSessionUser();
  const { sessions, isLoading } = useSessionByUid(sessionUser.id);
  console.log(sessions);
  return !isLoading ? (
    sessions.map((session) => <div>{session._id}</div>)
  ) : (
    <div></div>
  );
}
