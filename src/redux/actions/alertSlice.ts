import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlertState } from "../../constants/types/reduxInterfase";
import { ETypeAlert, IAlert } from "../../constants/types/types";


const initialState: IAlertState = {
  alert:
  {
    visible: false,
    typeSeverity: undefined,
    text: "",
  },

};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    unmountedAlert: (state) => {
      state.alert.visible = false;
    },
    mountAlert: (state, action: PayloadAction<IAlert>) => {
      state.alert.typeSeverity = action.payload.typeSeverity;
      state.alert.text = action.payload.text;
      state.alert.visible = true;
    },
  },
});

export const { mountAlert, unmountedAlert, } = alertSlice.actions;

export default alertSlice.reducer;