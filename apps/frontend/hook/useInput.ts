import { event } from "firebase-functions/lib/providers/analytics";
import { useState } from "react";

const useInput = (validateValue:(a:string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState<string>("");
    const [valueIsTouched, setValueIsTouched] = useState<boolean>(false) ;
const valueIsValid = validateValue(enteredValue);
const hasError = !valueIsValid && valueIsTouched;
const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
};
const inputBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueIsTouched(true);
};
const reset = () => {
    setEnteredValue ("");
    setValueIsTouched(false);
};
return {
    value: enteredValue, valueIsValid, hasError, valueChangeHandler, inputBlurHandler, reset
};
};
export default useInput;