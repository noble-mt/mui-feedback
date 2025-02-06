import { createContext, useContext } from "react";
import {
  AlertContent,
  ConfirmContent,
  NotificationContent,
} from "./alertContext";

export const AlertContext = createContext<{
  alert: (_item: AlertContent) => void;
  confirm: (_item: ConfirmContent) => void;
  notification: (_item: NotificationContent) => void;
  closeAllAlerts: () => void;
  closeAllNotifications: () => void;
  closeAllConfirmations: () => void;
}>({
  alert: () => {},
  confirm: () => {},
  notification: () => {},
  closeAllAlerts: () => {},
  closeAllNotifications: () => {},
  closeAllConfirmations: () => {},
});

export const useAlert = () => {
  const context = useContext(AlertContext);
  return context.alert;
};

export const useConfirm = () => {
  const context = useContext(AlertContext);
  return context.confirm;
};

export const useNotification = () => {
  const context = useContext(AlertContext);
  return context.notification;
};

export const useCloseAllAlerts = () => {
  const context = useContext(AlertContext);
  return context.closeAllAlerts;
};

export const useCloseAllNotifications = () => {
  const context = useContext(AlertContext);
  return context.closeAllNotifications;
};

export const useCloseAllConfirmations = () => {
  const context = useContext(AlertContext);
  return context.closeAllConfirmations;
};

export const useMuiFeedback = () => {
  return useContext(AlertContext);
};
