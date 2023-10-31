import { useEffect,  useState } from "react";
import { CompletedQuestion, History } from '@/database/history/entities/history.entity';
import { getHistoryByUserId } from '@/database/history/historyService';



function useHistories(userId: number, accessToken?: string | null) {
    const [isLoading, setIsLoading] = useState(false);
    const [histories, setHistories] = useState<History[]>([]);
    const [trigger, setTrigger] = useState(false);
    const [totalHistories] = useState(0);
    const [completedQuestion, setCompletedQuestion] = useState<CompletedQuestion[]>([]);
    const handleTrigger = () => {
        setTrigger(!trigger); // Toggles the trigger state
    };

    useEffect(() => {
        const handleUserHistories = () => {
            setCompletedQuestion([])
            histories.map((history) => {
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
        if (accessToken === null) return;
        getHistoryByUserId(userId, accessToken).then((histories) => {
            setHistories(histories);
            console.log("history ", histories);
            setTimeout(() => {
                setIsLoading(false);
            }, 50)

        }).catch((error) => {
            console.error(error);
        });
    }, [trigger, userId, accessToken]);

    return { histories, totalHistories, setHistories, isLoading, handleTrigger, completedQuestion };
    
}

export default useHistories