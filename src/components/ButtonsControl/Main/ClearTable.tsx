import React from "react";
import { Button, Avatar, Typography } from "@mui/material";
import { ImgClearTable, theadsTable } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { clearTable } from "../../../redux/actions/tableSlice";
import { changeStatusAnswer } from "../../../redux/actions/answerSlice";
import { changeCoeffExtraction } from "../../../redux/actions/editingTableSlice";
import { editingSelector } from "../../../redux/selectors/selector";

const ClearTable = () => {
  const { coeffExtraction } = useAppSelector(editingSelector)
  const dispatch = useAppDispatch();
  const onClickClearTable = (): void => {
    dispatch(clearTable());
    dispatch(changeStatusAnswer([false, null]));
    if (coeffExtraction) {
      theadsTable.pop();
    }
    dispatch(changeCoeffExtraction(false));

  };
  return (
    <Button sx={{
      display: "flex",
      flexDirection: "column",
      width: "70px",
      height: "100%",
    }}
      onClick={onClickClearTable}>
      <Avatar sx={{
        pointerEvents: "none",
        width: "100%",
        height: "70%",
      }}
        src={ImgClearTable}
        alt="ImgCreateRow"
        variant="square"
      />
      <Typography
        mt={0.5}
        variant="body1"
        sx={{ fontSize: "12px", }}>
        Очистить<br />таблицу
      </Typography>
    </Button>
  );
};

export default ClearTable;