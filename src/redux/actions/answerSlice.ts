import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswerState } from "../../constants/types/reduxInterfase";



const initialState: IAnswerState = {
  statusAnswer: false,
  tableData: null,
  answer: {
    sectionOne: {
      humidity: 0,
      ash: 0,
      heat: 0,
    },
    sectionTwo: {
      rdf: {
        humidity: 0,
        ash: 0,
        heat: 0,
      },
      tails: {
        humidity: 0,
        ash: 0,
        heat: 0,
      },
      preparedData: [],
    },
    sectionTTO: {
      massaTTO: {
        sectionOneMassa:0,
          sectionTwoRdf:0,
          sectionTwoTails:0
      },
      zolaTTO: {
        sectionOneMassaZola: 0,
        sectionTwoRdfZola: 0,
        sectionTwoTailsZola: 0
      }
    }
  },
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    changeStatusAnswer: (state, action: PayloadAction<[boolean, any]>) => {
      state.statusAnswer = action.payload[0];
      state.tableData = action.payload[1];
    },
    changeSectionTTO: (state, acyion) => {
    },
    updateAnswer: (state, action) => {
      state.answer = action.payload.answer;
    },
  },
});

export const { changeStatusAnswer, updateAnswer, changeSectionTTO } = answerSlice.actions;

export default answerSlice.reducer;