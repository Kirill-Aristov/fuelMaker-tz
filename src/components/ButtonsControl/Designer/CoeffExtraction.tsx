import React from "react";
import { Avatar, Button, Typography, Tooltip } from "@mui/material";
import { ImgCreateRow, theadsTable } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { editingSelector, tableActiveSelector } from "../../../redux/selectors/selector";
import { ETypeAlert } from "../../../constants/types/types";
import { mountAlert } from "../../../redux/actions/alertSlice";
import { changeCoeffExtraction } from "../../../redux/actions/editingTableSlice";
const CoeffExtraction = () => {
  const { tableActive, } = useAppSelector(tableActiveSelector);
  const { coeffExtraction, } = useAppSelector(editingSelector);
  const dispatch = useAppDispatch();
  const onClickAddCoeff = () => {
    if (tableActive.length === 0) {
      return dispatch(mountAlert({
        typeSeverity: ETypeAlert.WARNING,
        text: "Таблица пуста",
      }));
    } else {
      if (coeffExtraction) {
        return dispatch(mountAlert({
          typeSeverity: ETypeAlert.SUCCESS,
          text: "Коэффициенты уже внесены",
        }));
      }
      dispatch(changeCoeffExtraction(true));
      theadsTable.push("Коэффициент извлечения");
      dispatch(mountAlert({
        typeSeverity: ETypeAlert.SUCCESS,
        text: "Коэффициенты извлечения успешно добавлены",
      }));
    }
  };
  return (
    <Tooltip title="Добавить коэффециент извлечения">
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70px",
          height: "100%",
        }}
        onClick={onClickAddCoeff}
      >
        <Avatar sx={{
          pointerEvents: "none",
          width: "100%",
          height: "70%",
        }}
          alt="ImgCreateRow"
          variant="square"
        />
        <Typography
          mt={0.5}
          variant="body1"
          sx={{ fontSize: "12px", }}>
          Коэффециент<br />извлечения
        </Typography>
      </Button>
    </Tooltip>
  );
};

export default CoeffExtraction;