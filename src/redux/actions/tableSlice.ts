import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EStatusRows, IRow, ITitleRow } from "../../constants/types/types";
import { ITableState } from "../../constants/types/reduxInterfase";



const initialState: ITableState = {
  tableActive: [],
};

export const tableSlice = createSlice({
  name: "tableActive",
  initialState,
  reducers: {
    //создание новой строки
    createNewRow: (state, action: PayloadAction<IRow>) => {
      state.tableActive = ([action.payload as any]).concat(state.tableActive);
      //state.tableActive.unshift(action.payload);
    },
    //Удаление строки или заголовка 
    removeRow: (state, action: PayloadAction<{
      rowKey: React.Key;
    }>) => {
      state.tableActive = state.tableActive.filter((item: any) => item.keyRow !== action.payload.rowKey);
    },
    //Удаление заголовка со строками
    removeTitleAndRow: (state, action: PayloadAction<{
      startHead: number;
      itemsEnd: number;
    }>) => {
      state.tableActive.splice(action.payload.startHead, action.payload.itemsEnd);
    },
    ////////
    //создание нового заголовка 
    createNewTitleRow: (state, action: PayloadAction<{
      head: ITitleRow;
      items: IRow[];
    }>) => {
      state.tableActive = state.tableActive.concat(action.payload.head);
      state.tableActive = state.tableActive.concat(...action.payload.items);
    },
    //создание строки под заголовком
    сreateRowUnderTitle: (state, action: PayloadAction<{
      indexRow: number;
      value: IRow;
    }>) => {
      // state.tableActive = state.tableActive[action.payload.indexRow].concat(action.payload.value)
      state.tableActive.splice(action.payload.indexRow, 0, action.payload.value);
    },
    updateDataRow: (state, action: PayloadAction<{
      indexRow: number;
      value: IRow;
    }>) => {
      state.tableActive[action.payload.indexRow - 1] = action.payload.value;
    },
    updateCoeffRow: (state, action: PayloadAction<{
      indexRowStart: number;
      indexRowEnd: number;
      valueCoeff: number;
    }>) => {
      state.tableActive = state.tableActive.filter((item: any, index: number) => {
        if (action.payload.indexRowStart < index && action.payload.indexRowEnd >= index) {
          return item.coeff = action.payload.valueCoeff;
        } else {
          return item;
        }
      });
    },
    clearTable: (state) => {
      state.tableActive = [];
    },
    updateTitleRow: (state, action) => {
    },
    createReadyTable: (state, action: PayloadAction<(IRow | ITitleRow)[]>) => {
      state.tableActive = state.tableActive.concat(...action.payload);
    },
  },
});

export const { createNewRow, removeRow, clearTable, createNewTitleRow, createReadyTable, updateDataRow, updateTitleRow, сreateRowUnderTitle, removeTitleAndRow, updateCoeffRow, } = tableSlice.actions;

export default tableSlice.reducer;