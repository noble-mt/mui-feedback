
import { Confirm, MuiConfirmProps } from "../components/Confirm/confirm";
import { MuiAlert, MuiAlertProps } from "../components/Alert/alert";
import { MuiNotificationProps, Notification } from "../components/Notificaiton/notification";
import { v4 as uuidv4 } from "uuid";
import { AlertContext } from "./context";
import { HORIZONTAL, VERTICAL } from "../constants/position";
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles'; 
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import { ReactNode, useCallback, useState } from "react";

function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const newObj: Partial<T> = {};

  for (const key in obj) {
    if (!keys.includes(key as unknown as K)) {
      newObj[key] = obj[key];
    }
  }
  return newObj as Omit<T, K>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNodeText = (node: any): string => {
  if (["string", "number"].includes(typeof node)) return node as string;
  if (node instanceof Array) return node.map(getNodeText).join(" ");
  if (typeof node === "object" && node) return getNodeText(node.props.children);
  return "";
};

const getWordCount = (message: string | ReactNode): number =>
  getNodeText(message).trim().split(/\s+/).length;

export interface AlertContent extends Omit<MuiAlertProps, 'globalProps'> {
  autoHide?: boolean;
  timeout?: number;
  stackAlerts?: boolean;
}
export interface AlertStack extends AlertContent {
  id: string;
}


export type NotificationContent = Omit<MuiNotificationProps, 'globalProps'>
export interface NotificationStack extends NotificationContent {
  id: string;
}


export type ConfirmContent = Omit<MuiConfirmProps, 'globalProps'>

export interface AlertGlobalProps extends Omit<AlertContent, 'onClose' | 'message' | 'globalProps' | 'timeout'> {
  vertical?: VERTICAL,
  horizontal?: HORIZONTAL
  autoHide?: boolean
}
export interface NotificationGlobalProps extends Omit<NotificationContent, 'open' |'anchorOrigin' | 'globalProps'> {
  vertical?: VERTICAL,
  horizontal?: HORIZONTAL
}
export type GlobalConfirmProps = Pick<ConfirmContent, 'cancelButtonProps' | 'successButtonProps' | 'componentProps' | 'styledDialogComponent' | 'customFooter' | 'hideTopCloseButton' | 'draggable'| 'position' | 'hideButtonProps'>

export const AlertProvider = ({ children, alertGlobalProps, notificationGlobalProps, confirmGlobalProps, theme }
  : { children: ReactNode, alertGlobalProps?: AlertGlobalProps, notificationGlobalProps?: NotificationGlobalProps, confirmGlobalProps?: GlobalConfirmProps, theme?: Theme}) => {
  const defaultTheme = createTheme(); 
  const [alertContent, setAlertContent] = useState<AlertStack[]>([]);
  const [confirmation, setConfirmation] = useState<ConfirmContent | null>(
    null
  );
  const [notificationContent, setNotificationContent] = useState<
    NotificationStack[]
  >([]);
  const alert = useCallback(
    ({ timeout, message, inout = 1000, autoHide, stackAlerts, ...rest }: AlertContent) => {
      let time = timeout;
      if (!time) {
        const wordCount = getWordCount(message);
        time = (wordCount > 4 ? wordCount : 4) * 1000 + inout * 2;
      }
      const id = uuidv4();
      setAlertContent((prev) => [...((stackAlerts || (stackAlerts === undefined && alertGlobalProps?.stackAlerts)) ? prev : []), { ...rest, message, id, timeout: time, inout }]);
      if(autoHide !== false || (autoHide === undefined && alertGlobalProps?.autoHide)) {
        setTimeout(() => {
          setAlertContent((stack) => stack.filter((item) => item.id !== id));
        }, time);
      }
    },
    [alertGlobalProps?.stackAlerts]
  );
  const notification = useCallback(
    ({ timeout = 3000, ...rest }: NotificationContent) => {
      const id = uuidv4();
      setNotificationContent(() => [{ ...rest, id }]);
      setTimeout(() => {
        setNotificationContent((stack) =>
          stack.filter((item) => item.id !== id)
        );
      }, timeout);
    },
    []
  );
  const confirm = useCallback((item: MuiConfirmProps) => {
    setConfirmation(item);
  }, []);

  const handleOnClose = (alert: AlertStack) => {
    setAlertContent((stack) => stack.filter((item) => item.id !== alert.id));
    alert?.onClose?.();
  }

  const closeAllAlerts = () => {
    setAlertContent([])
  }

  const closeAllNotifications = () => {
    setNotificationContent([])
  }

  const closeAllConfirmations = () => { 
    setConfirmation(null);
  }

  return (
    <AlertContext.Provider value={{ confirm, alert, notification, closeAllAlerts, closeAllNotifications, closeAllConfirmations }}>
        {children}{" "}
        <ThemeProvider theme={theme ?? defaultTheme}>
          {alertContent?.length > 0
            ? 
              <Snackbar open anchorOrigin={{ vertical: alertGlobalProps?.vertical ?? 'top', horizontal: alertGlobalProps?.horizontal ?? 'left'}}>
                <Box>
                  {alertContent.map((alert) => (
                    <MuiAlert key={alert.id} {...alert} onClick={() => handleOnClose(alert)} globalProps={alertGlobalProps} />
                  ))}
                </Box>
              </Snackbar>
            : ""}{" "}
          {notificationContent &&
            notificationContent.map((notification) => (
              <Notification key={notification.id} {...notification} globalProps={notificationGlobalProps}/>
            ))}{" "}
          {confirmation && (
            <Confirm
              onClose={() => {
                if (confirmation?.onClose) {
                  confirmation?.onClose();
                }
                setConfirmation(null);
              } }
              onSuccess={() => {
                confirmation?.onSuccess?.();
                setConfirmation(null);
              } }
              {...omit(confirmation, ["onClose", "onSuccess"])}
              globalProps={confirmGlobalProps}
            />
          )}{" "}
        </ThemeProvider>
    </AlertContext.Provider>
  );
};


