import React, { useEffect } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { EStatusRows, IRow, ITitleRow } from "../../constants/types/types";
import Row from "./Row";
import addNumberRow from "../../helpers/addNumberRow";
import TitleRow from "./TitleRow";
import { theadsTable } from "../../constants/constants";
import { editingSelector, tableActiveSelector } from "../../redux/selectors/selector";
import { removeTitleAndRow } from "../../redux/actions/tableSlice";
import { useDispatch } from "react-redux";


const TableData = () => {
  const { tableActive, } = useAppSelector(tableActiveSelector);
  const { coeffExtraction, } = useAppSelector(editingSelector);
  const dispatch = useDispatch();
  console.log("render");
  useEffect(() => {
    addNumberRow();
    console.log("tableActive appdate");
  }, [tableActive.length]);

  const onClickRemoveTitleAndRow = (current: React.MutableRefObject<HTMLTableRowElement | null>) => {
    if (current.current) {
      const currentIndexTitleRows: number = current.current.rowIndex;
      const indexTitleRows: number[] = [];
      tableActive.filter((item: IRow | ITitleRow, index: number) => item.row === EStatusRows.HEADER ? indexTitleRows.push(index) : "");
      const nearestLargestNumber: number = Math.min(...indexTitleRows.filter(i => i > currentIndexTitleRows));
      if (nearestLargestNumber === Infinity) {
        dispatch(removeTitleAndRow({
          startHead: currentIndexTitleRows - 1,
          itemsEnd: tableActive.length,
        }));
      } else {
        dispatch(removeTitleAndRow(
          {
            startHead: currentIndexTitleRows - 1,
            itemsEnd: nearestLargestNumber,
          }));
      }
    }
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "90%",
        margin: "0 auto",
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow>
            {theadsTable.map((thead, index) => (
              <TableCell
                padding="none"
                sx={{
                  color: "white",
                  fontSize: "16px",
                  py: 0.7,
                  px: 0.2,
                  textAlign: "center",
                  backgroundColor: "#1a76d2",
                  width: "8%",
                  "&:nth-of-type(1)": {
                    width: "0%",

                  },
                  "&:nth-of-type(2)": {
                    width: "0%",
                    px: `${tableActive.length === 0 ? "15px" : "0px"}`,
                  },
                  "&:nth-of-type(3)": {
                    width: "10%",
                  },
                }}
                key={index}
              >
                {thead}
              </TableCell >
            ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tableActive.map((item: IRow | ITitleRow) => (
              item.row === EStatusRows.ROW ?
                <Row
                  key={item.keyRow}
                  {...item}
                />
                :
                <TitleRow
                  key={item.keyRow}
                  onClickRemoveTitleAndRow={onClickRemoveTitleAndRow}
                  {...item}
                />
            ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
};

export default TableData;