
import { EStatusRows, IRow, ITitleRow } from "../constants/types/types";

export default function checkErrorTable(table: (IRow | ITitleRow)[]): [boolean, string] {
  const rowsMassa: number[] = [];
  table.filter(item => item.row === EStatusRows.ROW ? rowsMassa.push(item.massa) : "");
  const num = Math.round(rowsMassa.reduce((a: number, b: number) => a + b, 0) * 100) / 100;
  if (num < 100) {
    return [true, `Общее содержание меньше 100%, не хватает = ${Math.round((100 - num) * 100) / 100}%`];
  } else if (num > 100) {
    return [true, `Общее содержание Больше 100%, превышает на = ${Math.round((num - 100) * 100) / 100}%`];
  } else {
    return [false, ""];
  }
}