import { useEffect,  useState } from "react";
import { Role } from '@/utils/enums/Role';
import { CompletedQuestion, History } from '@/database/history/entities/history.entity';
import { getHistoryByUserId } from '@/database/history/historyService';



function useHistories(userId: number ,userRole?: Role) {
    const [isLoading, setIsLoading] = useState(false);
    const [histories, setHistories] = useState<History[]>([]);
    const [trigger, setTrigger] = useState(false);
    const [totalHistories, setTotalHistories] = useState(0);
    const [completedQuestion, setCompletedQuestion] = useState<CompletedQuestion[]>([]);
    const handleTrigger = () => {
        setTrigger(!trigger); // Toggles the trigger state
    };

    const handleUserHistories = () => {
        setCompletedQuestion([])
        histories.map((history) => {
            setCompletedQuestion((prevCompletedQuestion) => [
                ...prevCompletedQuestion,
                ...history.completed
            ])
        })
    }

    useEffect(() => {
        handleUserHistories()
    }, [histories])

    useEffect(() => {
        setIsLoading(true);
        console.log("userRole", userRole);
        if (userRole === Role.Unknown) return;
        getHistoryByUserId(userId, userRole).then((histories) => {
            setHistories(histories);
            console.log("history ", histories);
            setTimeout(() => {
                setIsLoading(false);
            }, 50)

        }).catch((error) => {
            console.error(error);
        });
    }, [trigger, userRole, userId]);

    return { histories, totalHistories, setHistories, isLoading, handleTrigger, completedQuestion };
    
}

export default useHistories