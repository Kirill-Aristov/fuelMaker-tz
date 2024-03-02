import { IAlert, IAnswerSection, IEditingTable, IRow, ITitleRow } from "./types";

interface ITableState {
  tableActive: (IRow | ITitleRow)[]
}
interface IAnswerState extends IAnswerSection {
  statusAnswer: boolean
  tableData: ITableState | null
}
interface IAlertState {
  alert: {
    visible: boolean;
    typeSeverity: IAlert["typeSeverity"];
    text: IAlert["text"];
  }
}
interface IEditingTableState extends IEditingTable {

}

export type { ITableState, IAnswerState, IAlertState, IEditingTableState };