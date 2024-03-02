import React, { useState, useRef, useEffect, useCallback } from "react";
import { Autocomplete, Button, Stack, TableCell, TableRow, TextField, Tooltip } from "@mui/material";
import { ETypeAlert, ITitleRow } from "../../constants/types/types";
import { autoCompluteTitleRow } from "../../constants/inputAutoComplite";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigationIcon from "@mui/icons-material/Navigation";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { removeRow, updateCoeffRow, сreateRowUnderTitle } from "../../redux/actions/tableSlice";
import { addNewRow } from "../../helpers/addNewRow";
import { editingSelector, tableActiveSelector } from "../../redux/selectors/selector";
import useInputString from "../../hooks/useInputString";
import debounce from "lodash.debounce";
import dataPreparation, { IPreparedTitleRow } from "../../scripts/dataPreparation";
import coefficientRange from "../../scripts/coefficientRange";


interface ITitleRowProps extends ITitleRow {
  onClickRemoveTitleAndRow: (current: React.MutableRefObject<HTMLTableRowElement | null>) => void;
}
const TitleRow: React.FC<ITitleRowProps> = React.memo(function TitleRow({ keyRow, rowTitle, coeff, onClickRemoveTitleAndRow, }) {
  const { coeffExtraction, } = useAppSelector(editingSelector);
  const { tableActive, } = useAppSelector(tableActiveSelector);
  const dispatch = useAppDispatch();
  const isTitleRow = useRef<null | HTMLTableRowElement>(null);
  const inputTitileRow = useInputString(rowTitle);
  useEffect(() => {
  }, []);
  const onClickCreateRowUnderTitle = () => {
    if (isTitleRow.current) {
      dispatch(сreateRowUnderTitle({
        value: addNewRow(),
        indexRow: isTitleRow.current.rowIndex,
      }));
    }
  };
  const tilteRow = useInputString(rowTitle);
  const debounceRow = useCallback(debounce(newDataTitleRow, 1000), []);

  useEffect(() => {

  }, []);
  function newDataTitleRow() {

  }
  const onClickRemoveTitleRow = () => {
    dispatch(removeRow(
      {
        rowKey: keyRow,
      }
    ));
  };


  const [statusInputCoeff, setStatusInputCoeff] = useState<boolean>(true);

  const isInputCoeff = useRef<HTMLInputElement | null>(null);
  const onClickChangeInputTitle = () => {
    setStatusInputCoeff(false);
    setTypeInputCoeff("number");
    setTimeout(() => {
      if (isInputCoeff.current) {
        isInputCoeff.current.focus();
      }
    }, 0);
  };

  const isSaveIcon = useRef<SVGSVGElement | null>(null);
  const isCloseIcon = useRef<SVGSVGElement | null>(null);
  const [typeInputCoeff, setTypeInputCoeff] = useState<"number" | "text">("text");
  const [inputCoeffString, setInputCoeffString] = useState<string>(coeff);
  const [inputCoeffNumber, setInputCoeffNumber] = useState<number>(0);
  const [preparedRowsItems, setPreparedRowsItems] = useState<IPreparedTitleRow[]>();
  useEffect(() => {
    const preparedData = dataPreparation(tableActive);
    const newPrepared = preparedData.filter((item: IPreparedTitleRow) => item.keyRow === keyRow);
    setPreparedRowsItems(newPrepared);
    setInputCoeffString(coefficientRange(newPrepared[0].rowsItems.data));
  }, [tableActive]);

  const onChangeInputCoeff = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueNumber = Number(event.target.value);
    if (valueNumber > 1) {
      setInputCoeffNumber(1);
      setInputCoeffString(String(1));
    } else {
      setInputCoeffNumber(valueNumber);
      setInputCoeffString(String(valueNumber));
    }
    if (isTitleRow.current && preparedRowsItems) {
      dispatch(updateCoeffRow({
        indexRowStart: isTitleRow.current.rowIndex - 1,
        indexRowEnd: isTitleRow.current.rowIndex - 1 + preparedRowsItems[0].rowsItems.data.length,
        valueCoeff: valueNumber > 1 ? 1 : valueNumber,
      }));
    }
  };

  const onClickSaveCoeff = useCallback(() => {
    setTypeInputCoeff("text");
    setStatusInputCoeff(true);
  }, []);
  return (
    <React.Fragment>
      <TableRow className="title-row__item"
        selected={true}
        ref={isTitleRow}
      >
        <TableCell>
          <Tooltip title="Удалить заголовок">
            <DeleteIcon
              sx={{ cursor: "pointer", }}
              onClick={onClickRemoveTitleRow} />
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Удалить заголовок со строками">
            <DeleteSweepIcon
              sx={{ cursor: "pointer", }}
              onClick={() => onClickRemoveTitleAndRow(isTitleRow)} />
          </Tooltip>
        </TableCell>
        <TableCell colSpan={4}>
          <Autocomplete
            freeSolo
            options={autoCompluteTitleRow}
            renderInput={(params) => <TextField {...params} label="Введите название заголовка"
            />}
            {...inputTitileRow}
          />
        </TableCell>
        <TableCell sx={{ textAlign: "center", }}>
          <Tooltip title="Добавить строку под заголовком">
            <Button
              variant="contained"
              onClick={onClickCreateRowUnderTitle}
              sx={{
                px: 0.5,
                py: 1,
                lineHeight: 1.1,
                lg: { px: 0, },
              }}
            >
              Добавить строку
              <NavigationIcon sx={{ transform: "rotate(180deg)", }} />
            </Button>
          </Tooltip>
        </TableCell>
        {coeffExtraction &&
          <TableCell>
            <Stack direction="row" alignItems="center" spacing={2.1}>
              <TextField
                label="Значение"
                autoComplete="off"
                type={typeInputCoeff}
                inputProps={{ max: 1, min: 0, step: 0.1, }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={statusInputCoeff}
                inputRef={isInputCoeff}
                value={!statusInputCoeff ? inputCoeffNumber : inputCoeffString}
                onBlur={onClickSaveCoeff}
                onChange={onChangeInputCoeff}
                sx={{
                  width: "70%",
                }}
              />
              {statusInputCoeff ?
                <Tooltip title="Изменить значение" placement="top" >
                  <CreateIcon onClick={onClickChangeInputTitle} sx={{ cursor: "pointer", }} />
                </Tooltip>
                :
                <CheckIcon
                  onClick={onClickSaveCoeff}
                  sx={{
                    cursor: "pointer",
                    border: "2px solid black",
                  }}
                />
              }
            </Stack>
          </TableCell>
        }
      </TableRow>
    </React.Fragment>
  );
});

export default TitleRow;