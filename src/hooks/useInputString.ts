import { useState } from "react";
type inputString = {
  value: string | null;
  onInputChange: (_: any, meaning: string | null) => void
}
export default function useInputString(initialValue: string | null): inputString {
  const [value, setValue] = useState(initialValue);
  const onInputChange = (_: any, meaning: string | null): void => {
    if (meaning) {
      meaning = meaning.charAt(0).toUpperCase() + meaning.slice(1);
    }
    setValue(meaning);
  };
  return { value, onInputChange, };
}