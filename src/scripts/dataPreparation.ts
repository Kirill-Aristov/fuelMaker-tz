import { EStatusRows, IRow, ITitleRow } from "../constants/types/types";
import { addKey } from "../helpers/addNewRow";
interface IPreparedTitleRow extends ITitleRow {
  rowsItems: {
    data: IRow[]
    indexRow: number[]
  }
}
export type {
  IPreparedTitleRow
};
export default function dataPreparation(
  tableActive: any
): IPreparedTitleRow[] {
  const categoryTitle: IPreparedTitleRow[] = [];
  const indexTitle: number[] = [];
  const unrecognizedRowsItems: IRow[] = [];
  for (let index = 0; index < tableActive.length; index++) {
    if (indexTitle.length === 0 && tableActive[index].row === EStatusRows.ROW) {
      unrecognizedRowsItems.push({
        ...tableActive[index],
        rowTitle: tableActive[index].rowTitle.trim() === "" ? "Пусто" : tableActive[index].rowTitle,
      });
    }
    if (indexTitle.length !== 0 && tableActive[index].row === EStatusRows.ROW) {
      categoryTitle[indexTitle.length - 1].rowsItems.data.push({
        ...tableActive[index],
        rowTitle: tableActive[index].rowTitle.trim() === "" ? "Нераспознано" : tableActive[index].rowTitle,
      });
      categoryTitle[indexTitle.length - 1].rowsItems.indexRow.push(index);
    }
    if (tableActive[index].row === EStatusRows.HEADER) {
      indexTitle.push(index);
      categoryTitle.push({
        ...tableActive[index],
        rowsItems: {
          data: [],
          indexRow: [],
        },
      });
    }
  }
  if (unrecognizedRowsItems.length !== 0) {
    categoryTitle.unshift({
      keyRow: addKey(),
      row: EStatusRows.HEADER,
      rowTitle: "Нераспознано",
      coeff: "0",
      rowsItems: {
        data: unrecognizedRowsItems,
        indexRow: [],
      },
    });
  }
  return categoryTitle;
}