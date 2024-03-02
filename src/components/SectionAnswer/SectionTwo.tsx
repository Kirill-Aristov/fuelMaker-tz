import React, { useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { IAnswerSection } from "../../constants/types/types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { calckChartData, optionsChart } from "../../scripts/chartOption";
import { tableActiveSelector } from "../../redux/selectors/selector";
import { useAppSelector } from "../../redux/store/hooks";


ChartJS.register(ArcElement, Tooltip, Legend);
const SectionTwo = ({ answer, }: IAnswerSection) => {
  const [activeInput, setActiveInput] = useState<boolean>(true);
  const { tableActive, } = useAppSelector(tableActiveSelector);
  const chartData = useMemo(() => {
    return calckChartData(tableActive)
  }, [answer.sectionOne]);
  return (
    <Stack
      direction="column"
      spacing={3}
      alignItems="center"
      justifyContent="center"
    >

      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Typography>
            Исходный состав
          </Typography>
          <Typography>
            1. Общая влажность ТКО: {answer.sectionOne.humidity.toFixed(2)} %
          </Typography>
          <Typography>
            2. Зольность на рабочую массу ТКО: {answer.sectionOne.ash.toFixed(2)} %
          </Typography>
          <Typography>
            3. Теплота сгорания на рабочую массу: {answer.sectionOne.heat.toFixed(2)} МДж
          </Typography>
          <Box my={1.5}></Box>
          <Box>
            <Typography>
              Исходный состав ТТО
            </Typography>
            <Typography>
              Теплота сгорания ТТО на рабочую массу: {answer.sectionTTO.massaTTO.sectionOneMassa.toFixed(2)} МДж/кг
            </Typography>
            <Typography>
              Зольность ТТО на рабочую массу: {answer.sectionTTO.zolaTTO.sectionOneMassaZola.toFixed(2)} %
            </Typography>
          </Box>
        </Box>
        {/* <Stack>
          <Box>
             <Pie data={chartData} options={optionsChart} /> 
          </Box>
        </Stack> */}
      </Stack>
      {/* <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >

        {!Number.isNaN(answer.sectionTwo.rdf.ash) ?
          <Box>
            <Typography>Остатки сортировки
            </Typography>
            <Typography>
              1. Общая влажность ТКО: {answer.sectionTwo.rdf.humidity.toFixed(2)} %</Typography>
            <Typography>
              2. Зольность на рабочую массу ТКО: {answer.sectionTwo.rdf.ash.toFixed(2)} %
            </Typography>
            <Typography>
              3. Теплота сгорания на рабочую массу: {answer.sectionTwo.rdf.heat.toFixed(2)} МДж
            </Typography>
            <Box></Box>
          </Box>
          :
          <></>
        }
         {!Number.isNaN(answer.sectionTwo.rdf.ash) ?
          <Stack>
            <Box>
               <Pie data={chartData} options={optionsChart} /> 
            </Box>
          </Stack>
          :
          <></>
        } 
      </Stack> */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {!Number.isNaN(answer.sectionTwo.rdf.ash) ?
          <Box>
            <Typography>
              Энергетическая фракция
            </Typography>
            <Typography>
              1. Общая влажность ТКО: {answer.sectionTwo.tails.humidity.toFixed(2)} %
            </Typography>
            <Typography>
              2. Зольность на рабочую массу ТКО: {answer.sectionTwo.tails.ash.toFixed(2)} %
            </Typography>
            <Typography>
              3. Теплота сгорания на рабочую массу: {answer.sectionTwo.tails.heat.toFixed(2)} МДж
            </Typography>
            <Box my={1.5}></Box>
            <Box>
              <Typography>
                Энергетическая фракция ТТО
              </Typography>
              <Typography>
                Теплота сгорания ТТО на рабочую массу: {answer.sectionTTO.massaTTO.sectionTwoTails.toFixed(2)} МДж/кг
              </Typography>
              <Typography>
                Зольность ТТО на рабочую массу: {answer.sectionTTO.zolaTTO.sectionTwoTailsZola.toFixed(2)} %
              </Typography>
            </Box>
          </Box>
          :
          <></>
        }
        {/* <Stack>
          <Box>
             <Pie data={chartData} options={optionsChart} /> 
          </Box>
        </Stack> */}
        {/* <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >

          <Box>
             <Pie data={chartData} options={optionsChart} /> 
          </Box>
        </Stack> */}
      </Stack>
    </Stack >
  );
};

export default SectionTwo;