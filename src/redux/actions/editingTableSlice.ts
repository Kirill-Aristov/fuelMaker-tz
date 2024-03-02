import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditingTableState } from "../../constants/types/reduxInterfase";


const initialState: IEditingTableState = {
  coeffExtraction: false,
};

export const editingTableSlice = createSlice({
  name: "editingTable",
  initialState,
  reducers: {
    changeCoeffExtraction: (state, action: PayloadAction<boolean>) => {
      state.coeffExtraction = action.payload;
    },
  },
});

export const { changeCoeffExtraction, } = editingTableSlice.actions;

export default editingTableSlice.reducer;