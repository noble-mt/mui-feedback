# Mui Feedback

A collection of user-friendly feedback components built with Material-UI, designed to enhance user experience with clear and concise notifications, alerts, and confirmation dialogs.

## Installation

````bash
// with npm
npm i mui-feedback

// with yarn
yarn add mui-feedback
````

## Usage
Mui Feedback can be used in your application as follows:

#### Basic Usage
````javascript
...import
import { AlertProvider } from 'mui-feedback';
import { useMuiFeedback } from 'mui-feedback';

const RootComponent = () => {
  return (
      <AlertProvider>
        <App />
      </AlertProvider>
  )
}


function App() {
  const { alert, confirm, notification } = useMuiFeedback();

  const handleAlert = () => {
    alert({
      message: "All will be good",
    })
  }
  const handleConfirm = () => {
    confirm({
      title: 'Confirm',
      message: "All will be good. Please be alert."
    })
  }
  const handleNotification = () => {
    notification({
      message: "All will be good",
    })
  }
  
  return (
    <>
      <Button variant='contained' onClick={handleAlert}>Show Alert</Button>
      <Button variant='contained' onClick={handleConfirm}>Show Confirm</Button>
      <Button variant='contained' onClick={handleNotification}>Show Notification</Button>
    </>
  )
}

````
#### Use with custom MuI Theme
If we want to pass custom Mui Theme file, we can provide an example as belows

````typescript
import { AlertProvider } from 'mui-feedback';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
...
});

const RootComponent = () => {
  return (
    <ThemeProvider theme={theme}>
        <AlertProvider  theme={theme}>
    <App />
        </AlertProvider>
    </ThemeProvider>
  )
}
````

#### Use custom Dialog Styles for Confirm Button
If we want to use styled Mui Dialog Component.
````typescript

const CustomDialogBox = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiDialogTitle-root": {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    padding: "8px 24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiDialogContent-root": {
    padding: `${theme.spacing(3)} !important`,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    justifyContent: "flex-end",
  },
}));

const RootComponent = () => {
  return (
    <AlertProvider confirmGlobalProps={{ styledDialogComponent: CustomDialogBox }}>
      <App />
    </AlertProvider>
  )
}
````

## Documentation

### Components

#### 1. AlertProvider

This is the main component of the Mui-Feedback. This is a context wrapper. It is recommend to wrap your entire application with this provider so you can use the Mui-Feedback compoents anyway in the application.

| Properties | Type | Description | Default
| --- | --- |--- | ---|
| alertGlobalProps | [AlertGlobalProps]([AlertGlobalProps](https://github.com/noble-mt/mui-feedback/blob/main/README.md#alertglobalprops)) |  Global Properties for the alert compoent.| <code>{ <br>  vertical: 'top',<br>  horizontal: 'left'<br />  stackAlerts: false<br>}</code>
| notificationGlobalProps | [NotificationGlobalProps](https://github.com/noble-mt/mui-feedback/main/README.md#notificationglobalprops) | Global Properties for the alert compoent. These properties can be overridden while invoking the notification | <code>{ <br>  vertical: 'top',<br>  horizontal: 'right'<br> }</pre>
| confirmGlobalProps | [GlobalConfirmProps](https://github.com/noble-mt/mui-feedback/main/README.md#globalconfirmprops) | All these properties can be overridden while invoking the confirm modal so we can call with different properties | <code>{ <br> { position: 'center-center', <br/> scrollable: false,<br/> hideTopCloseButton: false<br/> }<br/><code>
| theme | Theme.    |  Theme used for the Mui. [See full detail](https://mui.com/material-ui/customization/default-theme/)| 

###### AlertGlobalProps
````javascript
{
  vertical?: 'top' | 'bottom',
  horizontal?: 'left' | 'center' | 'right'
  stackAlerts?: boolean
}
````
###### NotificationGlobalProps
````javascript
{
  vertical?: 'top' | 'bottom',
  horizontal?: 'left' | 'center' | 'right'
}
````
###### GlobalConfirmProps
````javascript
{
  successButtonProps?: ButtonProps // Read https://mui.com/material-ui/api/button/#props
  cancelButtonProps?: ButtonProps // Read https://mui.com/material-ui/api/button/#props
  hideCancelButton?: boolean
  hideSuccessButton?: boolean
  hideTopCloseButton?: boolean
  customFooter?: () => ReactNode
  styledDialogComponent?: typeof StyledDialogBox | typeof Dialog // Read https://mui.com/material-ui/react-dialog/#customization
  componentProps?: {
      dialogProps?: DialogProps // Read https://mui.com/material-ui/api/dialog/#props
      dialogActionsProps?: DialogActionsProps // Read https://mui.com/material-ui/api/dialog-actions/#props
      dialogContentProps?: DialogContentProps // Read https://mui.com/material-ui/api/dialog-content/#props
      dialogTitleProps?: DialogTitleProps // Read https://mui.com/material-ui/api/dialog-title/#props
  }
  draggable?: boolean
  position?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  hideButtonProps?: IconButtonProps // Read https://mui.com/material-ui/api/icon-button/#props
}
````

### Methods
#### useMuiFeedback
you can use useMuiFeedback to export all the feedback compoents to you code

Example Usage
````typescript
 const { alert, confirm, notification } = useMuiFeedback();
````

#### useAlert
you can use useAlert to export dialog box function to your code

Example Usage
````typescript
 const alertMessage = useAlert();
````

#### useConfirm
you can use useConfirm to export the dialog box function to your code.

Example Usage
````typescript
 const confirm = useConfirm();
````

#### useNotification
you can use useNotification to export the notification box function to your code.

Example Usage
````typescript
 const notification = useNotification();
````
