import { useEffect, useState } from "react";

export type Notification = {
  title: string;
  description: string;
  read: boolean;
};

function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });
  const [numberOfUnreadNotifications, setNumberOfUnreadNotifications] = useState(0);

  const addNotification = (title: string, description: string) => {
    const newNotification = {
      title: title,
      description: description,
      read: false,
    };
    setNotifications([...notifications, newNotification]);
    setNumberOfUnreadNotifications((prevCount) => prevCount + 1);
  };

  const markNotificationAsRead = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications[index].read = true;
    setNotifications(newNotifications);
    setNumberOfUnreadNotifications((prevCount) => prevCount - 1);
  };

  const markAllNotificationsAsRead = () => {
    const newNotifications = [...notifications];
    newNotifications.forEach((notification) => (notification.read = true));
    setNotifications(newNotifications);
  };

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return {
    notifications,
    addNotification,
    numberOfUnreadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };
}

export default useNotification;
