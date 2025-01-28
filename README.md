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
| alertGlobalProps |<pre> { <br>  vertical?: 'top' or 'bottom',<br>  horizontal?: 'left' or 'center or 'right'<br>  stackAlerts?: boolean<br> }</pre>  |  Global Properties for the alert compoent.| <code>{ <br>  vertical: 'top',<br>  horizontal: 'left'<br />  stackAlerts: false<br>}</code>
| notificationGlobalProps | <pre> <br>{ <br>  vertical?: 'top' or 'bottom',<br />  horizontal?: 'left' or 'center or 'right'<br /> }</pre> | Global Properties for the alert compoent. These properties can be overridden while invoking the notification | <code>{ <br>  vertical: 'top',<br>  horizontal: 'right'<br> }</pre>
| confirmGlobalProps | <pre><br/>{ <br />'cancelButtonProps': Properties for Cancel Button. <br />      See full list of parameters [Mui Buttons](https://mui.com/material-ui/api/button/#props) <br /> 'successButtonProps': Properties for Success Button. <br />      See full list of parameters [Mui Buttons](https://mui.com/material-ui/api/button/#props)  <br /> 'componentProps'?: { <br />    dialogProps?: Properties for Dialog. <br />      See full list of parameters [Mui DialogBox](https://mui.com/material-ui/api/dialog/#props)<br />    dialogActionsProps?: Properties for Dialog Action. <br />      See full list of parameters [Mui DialogBox](https://mui.com/material-ui/api/dialog-actions/#props)<br />    dialogContentProps?: Properties for Dialog Content. <br />      See full list of parameters [Mui DialogBox](https://mui.com/material-ui/api/dialog-content/#props)<br />    dialogTitleProps?: Properties for Dialog Title. <br />      See full list of parameters [Mui DialogBox](https://mui.com/material-ui/api/dialog-title/#props)<br />  } <br /> 'styledDialogComponent': Custom Styled Dialog box component.  <br /> 'customFooter': React Node Here <br /> 'hideTopCloseButton': Boolean (Hide the top Close button)  <br /> 'draggable': Boolean (Draggable Modal)<br /> 'position': 'top-left'  'top-center'<br />   'top-right' 'center-left'  'center-center'<br />   'center-right'  'bottom-left'  'bottom-center'<br />   'bottom-right'<br /> 'hideButtonProps': Properties for IconButton. <br />    See full list of parameters [Mui Icon Button](https://mui.com/material-ui/api/icon-button/#props) <br />}<br /></pre> | All these properties can be overridden while invoking the confirm modal so we can call with different properties | <code>{ <br> { position: 'center-center', <br/> scrollable: false,<br/> hideTopCloseButton: false<br/> }<br/><code>
| theme | Theme.    |  Theme used for the Mui. [See full detail](https://mui.com/material-ui/customization/default-theme/)| 
