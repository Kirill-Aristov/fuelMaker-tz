import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { unmountedAlert } from "../../redux/actions/alertSlice";
import { alertSelector } from "../../redux/selectors/selector";

const SnackbarAlert = () => {
  const { alert, } = useAppSelector(alertSelector);
  const dispatch = useAppDispatch();
  const hideDuration = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
      dispatch(unmountedAlert());
  };

  return (
    <Snackbar
      open={alert.visible}
      autoHideDuration={3500}
      onClose={hideDuration}
    >
      <Alert
        onClose={hideDuration}
        variant="filled"
        severity={alert.typeSeverity}
        sx={{ width: "100%", }}
      >
        {alert.text}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;