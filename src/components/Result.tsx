import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../redux/store/hooks";
import { answerSelector } from "../redux/selectors/selector";
import SectionTwo from "./SectionAnswer/SectionTwo";
const Result = () => {
  const { answer, statusAnswer, } = useAppSelector(answerSelector);
  const isVisibleResult = useRef<any>(null);
  useEffect(() => {
    if (statusAnswer) {
      isVisibleResult.current.scrollIntoView({ behavior: "smooth", });
    }
  }, [statusAnswer]);
  return (
    <React.Fragment>
      {statusAnswer &&
        <Box ref={isVisibleResult} sx={{ margin: "50px", }}>
          <SectionTwo answer={answer} />
        </Box>
      }
    </React.Fragment>
  );
};

export default Result;