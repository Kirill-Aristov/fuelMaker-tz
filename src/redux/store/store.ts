import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "../actions/tableSlice";
import answerSlice from "../actions/answerSlice";
import alertSlice from "../actions/alertSlice";
import editingTableSlice from "../actions/editingTableSlice";


const store = configureStore({
  reducer: {
    table: tableSlice,
    editing: editingTableSlice,
    answer: answerSlice,
    alert: alertSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;