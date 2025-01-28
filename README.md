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
