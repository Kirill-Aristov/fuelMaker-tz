import ImgCreateRow from "../assets/icon/create-rows.png";
import ImgCreateTitleRow from "../assets/icon/create-header.png";
import ImgCalculation from "../assets/icon/calculations.png";
import btnSettingsImg from "../assets/icon/settings.png";
import ImgReadyTable from "../assets/icon/ready-table.png";
import ImgClearTable from "../assets/icon/clear-table.png";
import ImgSavedTable from "../assets/icon/save-table.png";

import { IHeaderReadyRow, ETitleRowCategory, IListsTableReady } from "./types/types";
import { TKO, TTO1, TTO2, fraction1, fraction2, fullComponentComposition, reducedComponentComposition, sort } from "../archive/data/tableReady";

export { ImgCreateTitleRow, ImgCreateRow, ImgClearTable, ImgCalculation, ImgReadyTable, ImgSavedTable };


const titlesRows: IHeaderReadyRow[] = [
  { title: "Добавить пустой заголовок", category: ETitleRowCategory.EMPTYHEADER, },
  { title: "Органические отходы", category: ETitleRowCategory.ORGANIC, },
  { title: "Полимеры", category: ETitleRowCategory.POLYMERS, },
  { title: "Макулатура", category: ETitleRowCategory.PAPER, },
  { title: "Дерево", category: ETitleRowCategory.TREE, },
  { title: "Текстиль", category: ETitleRowCategory.TEXTILE, },
  { title: "Комбинированные материалы", category: ETitleRowCategory.COMBINEDMATERIALS, },
  { title: "Металлы", category: ETitleRowCategory.METALS, },
  { title: "Стекло", category: ETitleRowCategory.GLASS, },
  { title: "Опасные материалы", category: ETitleRowCategory.HAZARDOUSMATERIALS, },
  { title: "Инертные материалы", category: ETitleRowCategory.INERTMATERIALS, },
  { title: "Прочие материалы", category: ETitleRowCategory.OTHERMATERIALS, },
  { title: "Отсев", category: ETitleRowCategory.DROPOUT, }
];

const theadsTable: string[] = [
  "",
  "№",
  "Наименование компонента",
  "Содержание, %",
  "Влажность, %",
  "Зольность на сухую массу %",
  "Теплота сгорания на сухую беззольную массу, МДж/кг"
];

const listsTableReady: IListsTableReady[] = [
  {
    category: 1,
    title: "Полный компонентный состав",
    data: fullComponentComposition,
  },
  {
    category: 2,
    title: "Сокращенный компонентный состав",
    data: reducedComponentComposition,
  },
  {
    category: 3,
    title: "ТКО без отсева",
    data: TKO,
  },
  {
    category: 4,
    title: "Основная сортировка",
    data: sort,
  },
  {
    category: 5,
    title: "Отбор энергетической фракции №1",
    data: fraction1,
  },
  {
    category: 6,
    title: "Отбор энергетической фракции №2",
    data: fraction2,
  },
  {
    category: 7,
    title: "ТТО №1",
    data: TTO1,
  },
  {
    category: 8,
    title: "ТТО №2",
    data: TTO2,
  }
];
const buttonsControlGroups: { title: string, section: number }[] = [
  {
    title: "Главная",
    section: 1,
  },
  {
    title: "Конструктор",
    section: 2,
  }
];

export { titlesRows, theadsTable, buttonsControlGroups, listsTableReady };