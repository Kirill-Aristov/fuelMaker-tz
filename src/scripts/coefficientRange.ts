import { IRow } from "../constants/types/types";

export default function coefficientRange(rowsItems: IRow[]): string {
  const coeff: number[] = [];
  rowsItems.forEach((element) => {
    coeff.push(element.coeff);
  });
  const max: Number = Math.max(...coeff);
  const min: Number = Math.min(...coeff);
  if (max === min) {
    return `${max}`;
  } else {
    return `${min}-${max}`;
  }
}