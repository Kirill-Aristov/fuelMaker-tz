import { EStatusRows, IAnswerSection, IRow, ITitleRow } from "../constants/types/types";
import getRandomColor from "./getRandomColor";


export const optionsChart = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
interface ICalckChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}
//(IRow | ITitleRow)[]
function calckChartData(tableActive: any): ICalckChartData {
  const newTableActive = tableActive.filter((item: (IRow | ITitleRow)) => item.row === EStatusRows.ROW).sort((a: any, b: any) => b.massa - a.massa);
  const rowDataset: {
    rowLabels: string[],
    rowData: number[]
  } = {
    rowLabels: [],
    rowData: [],
  };

  newTableActive.forEach((element: any) => {
    rowDataset.rowLabels.push(element.rowTitle);
    rowDataset.rowData.push(element.massa);
  });
  const data = {
    labels: rowDataset.rowLabels,
    datasets: [
      {
        data: rowDataset.rowData,
        backgroundColor: getRandomColor(rowDataset.rowLabels.length),
      }
    ],
  };
  return data;
}
export {
  calckChartData
};