import axios from "axios";
import { Role } from "@/utils/enums/Role";
import { History } from "./entities/history.entity";
import Router from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_HISTORY_SERVICE + "/api/history";

// Post new history
export const postNewHistory = async(
    newHistory: History,
    userRole: Role
) => {
    const config = {
        headers: {
            role: userRole,
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
export const getAllHistory = async (userRole?: Role) => {
    const config = {
        headers: {
        role: userRole,
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
export const getHistoryById = async (id: string, userRole?: Role) => {
    const config = {
        headers: {
            role: userRole,
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
    userRole: Role
) => {
    const config = {
        headers: {
            role: userRole,
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
export const getHistoryByUserId = async (userId: number, userRole?: Role) => {
    const config = {
        headers: {
            role: userRole,
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
export const deleteHistoryById = async (id: string, userRole: Role) => {
    const config = {
        headers: {
            role: userRole,
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
export const deleteHistoryByUserId = async (userId: string, userRole: Role) => {
    const config = {
        headers: {
            role: userRole,
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
export const getHistoryBySessionId = async (sessionId: string, userRole?: Role) => {
    const config = {
        headers: {
            role: userRole,
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
