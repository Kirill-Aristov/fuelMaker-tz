import React from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { useAppDispatch } from "../../../redux/store/hooks";
import { createNewRow } from "../../../redux/actions/tableSlice";
import { ImgCreateRow } from "../../../constants/constants";
import { addNewRow } from "../../../helpers/addNewRow";


const CreateRows = () => {
  const dispatch = useAppDispatch();
  const onClickCreateNewRow = (): void => {
    dispatch(createNewRow(addNewRow()));
  };
  return (
    <Button sx={{
      display: "flex",
      flexDirection: "column",
      width: "70px",
      height: "100%",
    }}
      onClick={onClickCreateNewRow}>
      <Avatar sx={{
        pointerEvents: "none",
        width: "100%",
        height: "70%",
      }}
        src={ImgCreateRow}
        alt="ImgCreateRow"
        variant="square"
      />
      <Typography
        mt={0.5}
        variant="body1"
        sx={{ fontSize: "12px", }}>
        Добавить<br />строку
      </Typography>
    </Button>
  );
};

export default CreateRows;