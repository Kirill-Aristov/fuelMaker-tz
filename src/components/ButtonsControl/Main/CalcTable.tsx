import React from "react";
import { Button, Typography, Avatar } from "@mui/material";
import { ImgCalculation } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { changeStatusAnswer, updateAnswer } from "../../../redux/actions/answerSlice";
import { calculationOfTableData } from "../../../service/calculation";
import { tableActiveSelector } from "../../../redux/selectors/selector";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import { mountAlert } from "../../../redux/actions/alertSlice";
import { ETypeAlert } from "../../../constants/types/types";
import checkErrorTable from "../../../scripts/checkErrorTable";

const CalcTable = () => {
  const { tableActive, } = useAppSelector(tableActiveSelector);
  const dispatch = useAppDispatch();
  const onClickCalcTable = () => {
    const [statusError, text] = checkErrorTable(tableActive);
    if (!statusError) {
      const answer = calculationOfTableData(tableActive);
      dispatch(updateAnswer(answer));
      dispatch(changeStatusAnswer([true, tableActive]));
    } else {
      dispatch(mountAlert({
        typeSeverity: ETypeAlert.ERROR,
        text: text,
      }));
    }
  };
  return (
    <Button sx={{
      display: "flex",
      flexDirection: "column",
      width: "70px",
      height: "100%",
    }}
      onClick={onClickCalcTable}>
      <Avatar sx={{
        pointerEvents: "none",
        width: "100%",
        height: "70%",
      }}
        src={ImgCalculation}
        alt="ImgCreateRow"
        variant="square"
      />
      <Typography
        mt={0.5}
        variant="body1"
        sx={{ fontSize: "12px", }}>
        Расчет
      </Typography>
    </Button>
  );
};

export default CalcTable;