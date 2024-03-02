import React from "react";
import { ImgCreateTitleRow, titlesRows } from "../../../constants/constants";
import { Button, Typography, Menu, MenuItem, Avatar } from "@mui/material";
import { IHeaderReadyRow } from "../../../constants/types/types";
import { useAppDispatch } from "../../../redux/store/hooks";
import { createNewTitleRow } from "../../../redux/actions/tableSlice";
import { addNewTitleRow } from "../../../helpers/addNewRow";
const CreateTitleRow = () => {
  const dispatch = useAppDispatch();
  const [dropMenuTitle, setDropMenuTitle] = React.useState<null | HTMLElement>(null);
  const open = Boolean(dropMenuTitle);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropMenuTitle(event.currentTarget);
  };
  const handleClose = () => {
    setDropMenuTitle(null);
  };
  const onClickCreateTitleRow = (heading: IHeaderReadyRow) => {
    dispatch(createNewTitleRow(addNewTitleRow(heading)));
    setDropMenuTitle(null);
  };
  return (
    <React.Fragment>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70px",
          height: "100%",
        }}>
        <Avatar sx={{
          pointerEvents: "none",
          width: "100%",
          height: "70%",
        }}
          src={ImgCreateTitleRow}
          alt="ImgCreateRow"
          variant="square"
        />
        <Typography
          mt={0.5}
          variant="body1"
          sx={{ fontSize: "12px", }}>
          Добавить<br />заголовок
        </Typography>
      </Button >
      <Menu
        anchorEl={dropMenuTitle}
        open={open}
        onClose={handleClose}
      >
        {titlesRows.map((item, index) => (
          <MenuItem
            onClick={() => onClickCreateTitleRow(item)}
            key={item.category}
            sx={{
              backgroundColor: `${index === 0 ? "#1a76d2" : ""}`,
              color: `${index === 0 ? "white" : ""}`,
              "&:hover": {
                backgroundColor: `${index === 0 ? "#115daa" : ""}`,
              },
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment >
  );
};

export default CreateTitleRow;