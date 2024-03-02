import React from "react";
import { Button, Avatar, Typography } from "@mui/material";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";


const SavedTable = () => {
  return (
    <Button sx={{
      display: "flex",
      flexDirection: "column",
      width: "70px",
      height: "100%",
    }}>
      <SaveAsOutlinedIcon />
      <Typography
        mt={0.5}
        variant="body1"
        sx={{ fontSize: "12px", }}>
        Сохранить<br />таблицу
      </Typography>
    </Button>
  );
};

export default SavedTable;