import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import type {alert} from "../utils/types";

const alert: alert = {
 message: "",
 type: "success",
 timeout: 5000 
};

interface state {
 isDarkMode: boolean;
 alert: alert;
 showAlert: boolean;
};

const initialState: state = {
 isDarkMode: false,
 showAlert: false,
 alert
};

export const utilsSlice = createSlice({
 name: "alert",
 initialState,
 reducers: {
  showAlert: (state, {payload}: PayloadAction<alert>) => {
   state.showAlert = true;
   let data = {...payload};
   if(!payload.timeout) data.timeout = 5000;
   state.alert = data;
  },
  closeAlert: (state) => {
   state.showAlert = false;
   state.alert = alert;
  },
  updateDarkMode: (state) => {
   state.isDarkMode = !state.isDarkMode;
  },
 },
});

export const {showAlert, closeAlert, updateDarkMode} = utilsSlice.actions;

export default utilsSlice.reducer;