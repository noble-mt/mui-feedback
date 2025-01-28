/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { AlertContent, ConfirmContent, NotificationContent } from "./alertContext";

export const AlertContext = createContext({
    alert: (_item: AlertContent) => {},
    confirm: (_item: ConfirmContent) => {},
    notification: (_item: NotificationContent) => {},
});

export const useAlert = () => {
  const context = useContext(AlertContext);
  return context.alert;
}

export const useConfirm = () => {
  const context = useContext(AlertContext);
  return context.confirm;
}

export const useNotification = () => {
  const context = useContext(AlertContext);
  return context.notification;
}

export const useMuiFeedback = () => {
  return useContext(AlertContext);
}