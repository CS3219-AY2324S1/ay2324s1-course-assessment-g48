import axios from "axios";
import { History } from "./entities/history.entity";
import Router from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_HISTORY_SERVICE + "/api/history";

// Post new history
export const postNewHistory = async(
    newHistory: History,
    accessToken?: string,
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return await axios
        .post(BASE_URL, {
            userIds: newHistory.userIds,
            sessionId: newHistory.sessionId,
            completed: newHistory.completed,
        }, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                Router.push("/401");
            }
            console.error(error);
            throw String(error.response.data.error);
        });
}

// Get all history
export const getAllHistory = async (accessToken?: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return await axios
        .get(BASE_URL, config)
        .then((response) => {
        return response.data;
        })
        .catch((error) => {
        if (error.response.status === 401) {
            Router.push("/401");
        }
        console.error(error);
        throw String(error.response.data.error);
        });
}

// Get history by id
export const getHistoryById = async (id: string, qid?: string, accessToken?: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            questionid: qid,
        },
    };
    return await axios
        .get(BASE_URL + `/${id}`, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                Router.push("/401");
            }
            console.error(error);
            throw String(error.response.data.error);
        });
}

// Update history by id
export const updateHistoryById = async (
    id: string,
    updatedHistory: History,
    accessToken?: string
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return await axios
        .put(BASE_URL + `/${id}`, {
            completed: updatedHistory.completed,
        }, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                Router.push("/401");
            }
            console.error(error);
            throw String(error.response.data.error);
        });
}

// Get history by userId
export const getHistoryByUserId = async (userId: number, accessToken?: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return await axios
        .get(BASE_URL + `/user/${userId}`, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                Router.push("/401");
            }
            console.error(error);
            throw String(error.response.data.error);
        });
}

// Delete history by id
export const deleteHistoryById = async (id: string, accessToken?: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return await axios
        .delete(BASE_URL + `/${id}`, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                Router.push("/401");
            }
            console.error(error);
            throw String(error.response.data.error);
        });
}

// Delete history by userId
export const deleteHistoryByUserId = async (userId: string, accessToken?: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return await axios
        .delete(BASE_URL + `/user/${userId}`, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                Router.push("/401");
            }
            console.error(error);
            throw String(error.response.data.error);
        });
}

// Get history by sessionId
export const getHistoryBySessionId = async (sessionId: string, accessToken?: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return await axios
        .get(BASE_URL + `/session/${sessionId}`, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                Router.push("/401");
            }
            console.error(error);
            throw String(error.response.data.error);
        });
}
