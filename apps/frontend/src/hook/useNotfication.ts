import { useEffect, useState } from "react";

export type Notification = {
    id: number;
    title: string;
    description: string;
    read: boolean;
}

function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([{id:1, title: "Test1", description: "Nice", read: false}, {id:2, title: "Test2", description: "Nice", read: false}]);

  const addNotification = (newNotification: Notification) => {
    setNotifications([...notifications, newNotification]);
  }

  const numberOfUnreadNotifications = () => {
    return notifications.filter((notification) => !notification.read).length;
  }

  

  return { notifications, addNotification, numberOfUnreadNotifications };
}

export default useNotification;