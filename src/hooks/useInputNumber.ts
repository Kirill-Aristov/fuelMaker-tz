import { useState } from "react";
import { mountAlert } from "../redux/actions/alertSlice";
import { ETypeAlert } from "../constants/types/types";
import { useAppDispatch } from "../redux/store/hooks";
type inputNumber = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function useInputNumber(initialValue: number, test?: string): inputNumber {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (Number(event.target.value) > 100) {
      setValue(100);
      if (!test) {
        dispatch(mountAlert({
          typeSeverity: ETypeAlert.INFO,
          text: "Значение не должно превышать 100%",
        }));
      }
    } else {
      setValue(Number(event.target.value));
    }
  };
  return { value, onChange, };
}