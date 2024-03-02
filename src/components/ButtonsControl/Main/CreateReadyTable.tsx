import React from "react";
import { Button, Avatar, Typography, Menu, MenuItem } from "@mui/material";
import { ImgReadyTable, listsTableReady } from "../../../constants/constants";
import { useAppDispatch } from "../../../redux/store/hooks";
import { createReadyTable } from "../../../redux/actions/tableSlice";
const CreateReadyTable = () => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickCreateReadyTable = (item: any) => {
    dispatch(createReadyTable(item));
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70px",
          height: "100%",
        }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{
          pointerEvents: "none",
          width: "100%",
          height: "70%",
        }}
          src={ImgReadyTable}
          alt="ImgCreateRow"
          variant="square"
        />
        <Typography
          mt={0.5}
          variant="body1"
          sx={{ fontSize: "12px", }}>
          Готовые<br />таблицы
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {listsTableReady.map((item) => (
          <MenuItem
            onClick={() => onClickCreateReadyTable(item.data)}
            key={item.category}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default CreateReadyTable;