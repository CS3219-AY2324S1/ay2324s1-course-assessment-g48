import { useEffect,  useState, useMemo } from "react";
import { CompletedQuestion, History } from '@/database/history/entities/history.entity';
import { getHistoryByUserId } from '@/database/history/historyService';
import { useSession } from "next-auth/react";



function useHistories(userId: number, accessToken?: string | null, refreshToken?: string | null) {
    const {data: session} = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [histories, setHistories] = useState<History[]>([]);
    const [trigger, setTrigger] = useState(false);
    const totalHistories = useMemo(() => 0, []);
    const [completedQuestion, setCompletedQuestion] = useState<CompletedQuestion[]>([]);
    const handleTrigger = () => {
        setTrigger(!trigger); // Toggles the trigger state
    };

    useEffect(() => {
        const handleUserHistories = () => {
            setCompletedQuestion([])
            histories.forEach((history) => {
                setCompletedQuestion((prevCompletedQuestion) => [
                    ...prevCompletedQuestion,
                    ...history.completed
                ])
            })
        }
        handleUserHistories()
    }, [histories])

    useEffect(() => {
        setIsLoading(true);
        if (accessToken === null || refreshToken === null) return;
        getHistoryByUserId(userId, accessToken, refreshToken).then((histories) => {
            if (histories.accessToken) {
                session!.user!.accessToken = histories.accessToken;
                console.log("Refresh accessToken", session);
            }
            setHistories(histories);
            console.log("history ", histories);
            setTimeout(() => {
                setIsLoading(false);
            }, 50)

        }).catch((error) => {
            console.error(error);
        });
    }, [trigger, userId, accessToken, refreshToken, session]);

    return { histories, totalHistories, setHistories, isLoading, handleTrigger, completedQuestion };
    
}

export default useHistories