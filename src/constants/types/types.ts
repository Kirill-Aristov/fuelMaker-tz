const enum EStatusRows {
  ROW = "row",
  HEADER = "header"
}

interface IRow {
  keyRow: React.Key;
  row: EStatusRows.ROW;
  rowTitle: string | null;
  massa: number;
  humidity: number;
  ash: number;
  heat: number;
  coeff: number;
  rdf?: number;
  tails?: number;
}
interface IEditingTable {
  coeffExtraction: boolean
}
interface ITitleRow {
  keyRow: React.Key;
  row: EStatusRows.HEADER;
  rowTitle: string | null;
  coeff: string;
}

type IHeaderReadyRow = {
  title: string;
  category: number;
}
const enum ETitleRowCategory {
  EMPTYHEADER,
  ORGANIC,
  POLYMERS,
  PAPER,
  TREE,
  TEXTILE,
  COMBINEDMATERIALS,
  METALS,
  GLASS,
  HAZARDOUSMATERIALS,
  INERTMATERIALS,
  OTHERMATERIALS,
  DROPOUT
}

const enum ETypeAlert {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}
interface IAlert {
  typeSeverity: ETypeAlert | undefined;
  text: string;
}

interface IAnswer {
  humidity: number;
  ash: number;
  heat: number;
}
interface IAnswerSection {
  answer: {
    sectionOne: IAnswer
    sectionTwo: {
      rdf: IAnswer;
      tails: IAnswer;
      preparedData: ITitleRow[] | undefined
    }
    sectionTTO:any
  }
}
interface IListsTableReady {
  category: number;
  title: string;
  data: any;
}
type TypeParametrIRow = "massa" | "humidity" | "ash" | "heat" | "coeffRow" | "rowTitle";

export type {
  TypeParametrIRow,
  IListsTableReady,
  IAnswer,
  IAnswerSection,
  IHeaderReadyRow,
  IRow,
  ITitleRow,
  IAlert,
  IEditingTable
};
export {
  ETypeAlert,
  EStatusRows,
  ETitleRowCategory
};