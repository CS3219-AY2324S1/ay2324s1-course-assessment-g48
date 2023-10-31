import useSessionUser from "@/hook/useSessionUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function HistoryRepo() {
    const { sessionUser } = useSessionUser();
    const [ userId, setUserId ] = useState(sessionUser.id);
    const router = useRouter();

    useEffect(() => {
        setUserId(sessionUser.id);
    }, [sessionUser]);

    if (sessionUser.id) {
            router.push(`/history/user/${userId}`);
    } else {
        router.push("/401");
    }
    
}
export default HistoryRepo;
