import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
const selectSelf = (state: RootState) => state;
const tableActiveSelector = createSelector(selectSelf, (state: RootState) => state.table);
const answerSelector = createSelector(selectSelf, (state: RootState) => state.answer);
const alertSelector = createSelector(selectSelf, (state: RootState) => state.alert);
const editingSelector = createSelector(selectSelf, (state: RootState) => state.editing);
export { tableActiveSelector, answerSelector, alertSelector, editingSelector };