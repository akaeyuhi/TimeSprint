import { useCallback, useState } from 'react';

export type ValidationErrors<T> = { [K in keyof T]: boolean };

type ReturnType<T> = [
  state: T,
  onChange: (key: keyof T, value: T[keyof T]) => void,
  errors: ValidationErrors<T>
];

export const useValidation = <T extends object>(initialValue: T,
  validationFunc: (state: T) => ValidationErrors<T>): ReturnType<T> => {
  const [state, setState] = useState(initialValue);
  const [errors, setErrors] = useState<ValidationErrors<T>>(() => validationFunc(initialValue));

  const onChange = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      const nextState = { ...state, [key]: value };
      setState(nextState);
      setErrors(validationFunc(nextState));
    },
    [state, validationFunc]
  );

  return [state, onChange, errors];
};
