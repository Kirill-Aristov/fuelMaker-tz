import { addKey } from "../helpers/addNewRow";
import { compareStringCoeffData } from "../scripts/compareString";
import { EStatusRows, IAnswerSection, IRow, ITitleRow } from "../constants/types/types";
import dataPreparation, { IPreparedTitleRow } from "../scripts/dataPreparation";

const reducer = ((accumulator: number, currentValue: number) => accumulator + currentValue);

const enum EParametersCalc {
  RDF = "rdf",
  TAILS = "tails",
  MASSA = "massa"
}
function calculationOfTableData(tableActive: (IRow | ITitleRow)[]) {
  const preparedData: IPreparedTitleRow[] = dataPreparation(tableActive);
  const recalculationOfSortingData: IPreparedTitleRow[] = dataAfterSortingSectionSorting(preparedData);
  const massaHeatOfCombustion = calculationTheHeatOfCombustion(EParametersCalc.MASSA, recalculationOfSortingData);
  const rdfHeatOfCombustion = calculationTheHeatOfCombustion(EParametersCalc.RDF, recalculationOfSortingData);
  const tailsHeatOfCombustion = calculationTheHeatOfCombustion(EParametersCalc.TAILS, recalculationOfSortingData);
  const TTO = clacTTO(EParametersCalc.MASSA, recalculationOfSortingData)
  const TTOrdf = clacTTO(EParametersCalc.RDF, recalculationOfSortingData)
  const TTOtails = clacTTO(EParametersCalc.TAILS, recalculationOfSortingData)
  const answer: IAnswerSection = {
    answer: {
      sectionOne: massaHeatOfCombustion,
      sectionTwo: {
        rdf: rdfHeatOfCombustion,
        tails: tailsHeatOfCombustion,
        preparedData: preparedData,
      },
      sectionTTO: {
        massaTTO: {
          sectionOneMassa: TTO[0],
          sectionTwoRdf: TTOrdf[0],
          sectionTwoTails: TTOtails[0]
        },
        zolaTTO: {
          sectionOneMassaZola: TTO[1],
          sectionTwoRdfZola: TTOrdf[1],
          sectionTwoTailsZola: TTOtails[1]
        }
      }
    },
  };
  return answer;
}
function clacTTO(parametr: EParametersCalc, dataTable: IPreparedTitleRow[]) {
  const rowTable: any = [];
  dataTable.forEach(element => {
    if (element.rowsItems) {
      element.rowsItems.data.forEach(rowItem => {
        rowTable.push(rowItem);
      });
    }
  });
  const elementPlus = []
  let plusItem = 0
  for (const element of rowTable) {
    elementPlus.push(element[parametr])
  }
  plusItem = elementPlus.reduce(reducer)
  let hamedit
  const hameditPlus = []
  for (const element of rowTable) {
    hameditPlus.push(((element[parametr] / plusItem * 100)) * (1 - (element.humidity / 100)))
  }
  hamedit = hameditPlus.reduce(reducer)
  const sostav = []
  const zolaPlus = []
  for (let index = 0; index < rowTable.length; index++) {
    sostav.push((hameditPlus[index] * 100 / hamedit) * (rowTable[index].heat / 100) * (1 - rowTable[index].ash / 100))
    zolaPlus.push((hameditPlus[index] * 100 / hamedit) * (rowTable[index].ash / 100))
  }
  let ansPred = sostav.reduce(reducer)
  let ansZolaPred = zolaPlus.reduce(reducer)
  let ansZola = ansZolaPred * (1 - 10 / 100)
  let ans = ansPred * (1 - 10 / 100) - 0.02442 * 10
  return [ans, ansZola]
}
function zolaTTO(parametr: EParametersCalc, dataTable: IPreparedTitleRow[]) {

  return
}
function calculationTheHeatOfCombustion(parametr: EParametersCalc, dataTable: IPreparedTitleRow[]): any {
  const rowTable: any = [];
  dataTable.forEach(element => {
    if (element.rowsItems) {
      element.rowsItems.data.forEach(rowItem => {
        rowTable.push(rowItem);
      });
    }
  });
  const elementPlus = []
  let plusItem = 0
  //Влажность переменные
  const massTimesMoisture = [];// Массив данных влажность умноженная на
  ////////////////////////////////////////////////
  //Зольность переменные
  const leftAshContentTop = []; //левое уравнение верхней части дроби
  const leftAshContentBottom = []; //левое уравнение нижней части дроби
  //////////////////////////////////////////////////////
  //Теплота сгорания переменные
  const leftHeat = []; //первая часть уравнения
  /////////////////////////////////////////////////
  for (const element of rowTable) {
    elementPlus.push(element[parametr])
  }
  plusItem = elementPlus.reduce(reducer)
  for (const element of rowTable) {
    /////////////// Расчет общей влажности //////////////////
    massTimesMoisture.push((element[parametr] / plusItem * 100) / 100 * element.humidity);
    /////////////////////////////////////
    ///////////////// //Расчёт общей Зольности //////////////////////
    leftAshContentTop.push((element[parametr] / plusItem * 100) * element.ash * (100 - element.humidity));
    leftAshContentBottom.push((element[parametr] / plusItem * 100) * (100 - element.humidity));
    ////////////////////////////////////////////////////////////
    ///////////////////Удельная теплота сгорания
    leftHeat.push((element[parametr] / plusItem * 100) * (1 - element.humidity / 100) * (1 - element.ash / 100) * element.heat);
    ////////////////////////////////////////////////////////
  };


  const humidity = massTimesMoisture.reduce(reducer) * 100;
  const ash = (leftAshContentTop.reduce(reducer) / leftAshContentBottom.reduce(reducer)) * (1 - (humidity / 100 / 100));
  const heat = (leftHeat.reduce(reducer) - 0.02442 * humidity) / 100;
  const resultCalcFunction = {
    humidity: humidity / 100,
    ash: ash,
    heat: heat,
  };
  return resultCalcFunction;
}

function dataAfterSortingSectionSorting(dataTable: IPreparedTitleRow[]) {
  dataTable.forEach((element: IPreparedTitleRow) => {
    element.rowsItems.data.forEach((rowItem: IRow) => {
      rowItem.rdf = Math.floor(rowItem.coeff * rowItem.massa * 100) / 100;
      rowItem.tails = Math.floor((1 - rowItem.coeff) * rowItem.massa * 100) / 100;
    });
  });
  return dataTable;
};
export { calculationOfTableData };