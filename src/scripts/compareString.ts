import { coeffHeadData } from "../constants/coeffData";


function compareStringCoeffData(rowTitle: string): string {
  let indexString: number = 0;
  const standartString = rowTitle.replace(/\s/g, "").toLowerCase();

  coeffHeadData.forEach((item, index) => {
    if (item.headName.replace(/\s/g, "").toLowerCase() === standartString) {
      indexString = coeffHeadData[index].coeffHead;
    }
  });
  return String(indexString);
}

export {
  compareStringCoeffData
};