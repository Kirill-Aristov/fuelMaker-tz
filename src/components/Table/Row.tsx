import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { ETypeAlert, IRow } from "../../constants/types/types";
import { TableCell, TableRow, Autocomplete, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { autoCompluteRow } from "../../constants/inputAutoComplite";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { removeRow, updateDataRow } from "../../redux/actions/tableSlice";
import debounce from "lodash.debounce";
import useInputString from "../../hooks/useInputString";
import useInputNumber from "../../hooks/useInputNumber";
import { editingSelector } from "../../redux/selectors/selector";
import { mountAlert } from "../../redux/actions/alertSlice";

const Row: React.FC<IRow> = React.memo(function Row(propsRow) {
  const { coeffExtraction, } = useAppSelector(editingSelector);
  const dispatch = useAppDispatch();
  const isRow = useRef<HTMLTableRowElement | null>(null);

  const rowName = useInputString(propsRow.rowTitle);
  const rowMassa = useInputNumber(propsRow.massa);
  const rowHumidity = useInputNumber(propsRow.humidity);
  const rowAsh = useInputNumber(propsRow.ash);
  const rowHeat = useInputNumber(propsRow.heat, "test");
  const [inputCoeff, setInputCoeff] = useState<number>(propsRow.coeff);
  useEffect(() => {
    setInputCoeff(propsRow.coeff);
  }, [propsRow.coeff]);
  const debounceRow = useCallback(debounce(newDataRow, 1000), []);
  useEffect(() => {
    debounceRow({
      ...propsRow,
      rowTitle: rowName.value,
      massa: rowMassa.value,
      humidity: rowHumidity.value,
      ash: rowAsh.value,
      heat: rowHeat.value,
      coeff: inputCoeff,
    });
  }, [rowName.value, rowMassa.value, rowHumidity.value, rowAsh.value, rowHeat.value, inputCoeff]);
  function newDataRow(dateRow: IRow) {
    if (isRow.current) {
      dispatch(updateDataRow({
        indexRow: isRow.current.rowIndex,
        value: dateRow,
      }));
    }
  }
  const onChangeInputCoeff = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueNumber: number = Number(event.target.value);
    if (valueNumber > 1) {
      setInputCoeff(1);
      dispatch(mountAlert({
        typeSeverity: ETypeAlert.INFO,
        text: "Коэффициент извлечения должен находиться в диапазоне 0-1",
      }));
    } else {
      setInputCoeff(valueNumber);
    }
  };

  const onClickRemoveRow = useCallback(() => {
    dispatch(removeRow({
      rowKey: propsRow.keyRow,
    }));
  }, []);
  return (
    <TableRow hover={true} ref={isRow} >
      <TableCell >
        <Tooltip title="Удалить строку">
          <DeleteIcon onClick={onClickRemoveRow}
            sx={{ cursor: "pointer", }} />
        </Tooltip>
      </TableCell>
      <TableCell className="number__row"></TableCell>
      <TableCell>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={autoCompluteRow.map((item) => item)}
          renderInput={(params) => <TextField
            {...params}
            label="Название компонента"
            sx={{
              py: 0.1,
              px: 0.1,
            }}
          />}
          {...rowName}
          sx={{
            width: "100%",
            py: 0.1,
            px: 0.1,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Значение"
          type="number"
          inputProps={{ max: 100, min: 0, }}
          InputLabelProps={{
            shrink: true,
          }}
          {...rowMassa}
          sx={{
            width: "100%",
            py: 0.1,
            px: 0.1,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Значение"
          type="number"
          inputProps={{ max: 100, min: 0, }}
          InputLabelProps={{
            shrink: true,
          }}
          {...rowHumidity}
          sx={{
            width: "100%",
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Значение"
          type="number"
          inputProps={{ max: 100, min: 0, }}
          InputLabelProps={{
            shrink: true,
          }}
          {...rowAsh}
          sx={{
            width: "100%",
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Значение"
          type="number"
          inputProps={{ max: 100, min: 0, }}
          InputLabelProps={{
            shrink: true,
          }}
          {...rowHeat}
          sx={{
            width: "100%",
          }}
        />
      </TableCell>
      {coeffExtraction &&
        <TableCell>
          <TextField
            label="Значение"
            type="number"
            inputProps={{ max: 1, min: 0, step: 0.1, }}
            InputLabelProps={{
              shrink: true,
            }}
            value={inputCoeff}
            onChange={onChangeInputCoeff}
            sx={{
              width: "100%",
            }}
          />
        </TableCell>
      }
    </TableRow >
  );
});

export default Row;