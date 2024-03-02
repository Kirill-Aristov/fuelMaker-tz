import React, { useState } from "react";
import { Stack, Divider, AppBar, ButtonGroup, Button } from "@mui/material";

import BlockControl from "./BlockControl";
import { buttonsControlGroups } from "../constants/constants";

const Header = () => {
  const [sectionActive, setSectionActive] = useState<number>(1);
  return (
    <AppBar position="sticky"
      sx={{
        width: "100%",
        overflowY: "hidden",
        backgroundColor: "white",
        padding: "10px 15px 5px",
        marginBottom: "20px",
        px: 0,
        py: 0,
        md: { overflowX: "scroll", },
      }}
    >
      <Stack
        direction="row"
        sx={{ backgroundColor: "#1a76d2", px: 1, paddingTop: 1, }}
      >
        {buttonsControlGroups.map((item) => (
          <Button
            variant="text"
            sx={{
              color: `${sectionActive === item.section ? "#1a76d2" : "white"}`,
              backgroundColor: `${sectionActive === item.section ? "white" : "transparent"}`,
              borderRadius: "0",
              borderTopLeftRadius: "2px",
              borderTopRightRadius: "2px",
              "&:hover": {
                backgroundColor: `${sectionActive === item.section ? "white" : "transparent"}`,
                color: `${sectionActive === item.section ? "#1a76d2" : "white"}`,
              },
            }}
            key={item.section}
            onClick={() => setSectionActive(item.section)}
          >
            {item.title}
          </Button>
        ))}
      </Stack >
      <BlockControl sectionActive={sectionActive} />
    </AppBar >
  );
};

export default Header;