import React, { createContext, useState } from 'react';
import { Alert, Button, Snackbar, Stack } from '@mui/material';

export const Toast = createContext();

export const Toastify = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("I'm a custom snackbar");
  const [duration, setDuration] = useState(2000);
  const [severity, setSeverity] = useState('success');

  const showMessage = (message, severity = 'success', duration = 6000) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const toastComponent = (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return (
    <Toast.Provider value={{ showMessage }}>
      {children}
      {toastComponent}
    </Toast.Provider>
  );
};
