import { IDataTitleRow } from "../archive/data/dataForCreatingTitleRow";
import { dataTitleRow } from "../archive/data/dataForCreatingTitleRow";
import { EStatusRows, ETitleRowCategory, IHeaderReadyRow, IRow, ITitleRow } from "../constants/types/types";
import { compareStringCoeffData } from "../scripts/compareString";
function addNewRow(data?: IRow): IRow {
  if (data) {
    return {
      ...data,
      keyRow: addKey(),
    };
  }
  return {
    keyRow: addKey(),
    row: EStatusRows.ROW,
    rowTitle: "",
    massa: 0,
    humidity: 0,
    ash: 0,
    heat: 0,
    coeff: 0,
  };

}
function addNewTitleRow(heading: IHeaderReadyRow): {
  head: ITitleRow,
  items: IRow[]
} {
  if (heading.category === ETitleRowCategory.EMPTYHEADER) {
    const titleRow: ITitleRow = newTitleRow("");
    const rowsItems: IRow[] = [];
    rowsItems.push(addNewRow());
    return {
      head: titleRow,
      items: rowsItems,
    };
  }
  else {
    const titleRow: ITitleRow = newTitleRow(heading.title);
    const rowsItems: IRow[] = [];
    dataTitleRow.filter((item: IDataTitleRow) => item.category === heading.category ? rowsItems.push(addNewRow(item)) : "");
    return {
      head: titleRow,
      items: rowsItems,
    };
  }
}
function newTitleRow(title: string): ITitleRow {
  return {
    keyRow: addKey(),
    row: EStatusRows.HEADER,
    rowTitle: title,
    coeff: compareStringCoeffData(title),
  };
}

function addKey(max = 1000000000, min = 1100): React.Key {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export { addNewTitleRow, addNewRow, addKey };