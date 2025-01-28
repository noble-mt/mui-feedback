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
| alertGlobalProps |<code> { <br>  vertical?: 'top' or 'bottom',<br>  horizontal?: 'left' or 'center or 'right'<br>  stackAlerts?: boolean }</code>  |  Global Properties for the alert compoent.| <code>{ <br>  vertical: 'top',<br>  horizontal: 'left'<br>  stackAlerts: false<br>}</code>
| notificationGlobalProps | <code> <br>{ <br>  vertical?: 'top' or 'bottom',<br>  horizontal?: 'left' or 'center or 'right'<br> }</code> | Global Properties for the alert compoent. These properties can be overridden while invoking the notification | <code>{ <br>  vertical: 'top',<br>  horizontal: 'right'<br> }</code>
