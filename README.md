# Mui Feedback

A collection of user-friendly feedback components built with Material-UI, designed to enhance user experience with clear and concise notifications, alerts, and confirmation dialogs.

## Installation

````
// with npm
npm i mui-feedback

// with yarn
yarn add mui-feedback
````

## Usage
````
...import
import { AlertProvider } from 'mui-feedback';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useMuiFeedback } from 'mui-feedback';

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
