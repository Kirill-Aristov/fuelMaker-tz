import React from "react";
import { CalcTable, ClearTable, CreateRows, CreateTitleRow, CreateReadyTable } from "./ButtonsControl/Main";
import { Stack } from "@mui/material";
import { CoeffExtraction } from "./ButtonsControl/Designer";
type Props = {
  sectionActive: number
}

const BlockControl = ({ sectionActive, }: Props) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="top"
      sx={{ px: 2, my: 1, }}

    >
      {sectionActive === 1 &&
        <React.Fragment>
          <CreateRows />
          <CreateTitleRow />
          <CalcTable />
          <ClearTable />
          <CreateReadyTable />
          {/* <SavedTable /> */}
        </React.Fragment>
      }
      {sectionActive === 2 &&
        <React.Fragment>
          <CoeffExtraction />
        </React.Fragment>
      }
    </Stack>
  );
};

export default BlockControl;