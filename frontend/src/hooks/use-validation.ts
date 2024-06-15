import { useCallback, useState } from 'react';

export type ValidationErrors<T> = { [K in keyof T]: boolean };

export class FormValidation<T> {
  errors: ValidationErrors<T>;

  constructor(errors: ValidationErrors<T>) {
    this.errors = errors;
  }

  validate(): boolean {
    return Object.values(this.errors).every((error) => !error);
  }

  getErrors(): ValidationErrors<T> {
    return this.errors;
  }

  // Method to set the errors
  setErrors(newErrors: ValidationErrors<T>): void {
    this.errors = newErrors;
  }

  // Method to set a specific error field
  setErrorField<K extends keyof T>(field: K, value: boolean): void {
    this.errors[field] = value;
  }
}

type ReturnType<T> = [
  state: T,
  onChange: (key: keyof T, value: T[keyof T]) => void,
  errors: FormValidation<T>,
];

export const useValidation = <T extends object>(
  initialValue: T,
  validationFunc: (state: T) => ValidationErrors<T>
): ReturnType<T> => {
  const [state, setState] = useState(initialValue);
  const [errors, setErrors] = useState<FormValidation<T>>(
    () => new FormValidation<T>(validationFunc(initialValue))
  );

  const onChange = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      const nextState = { ...state, [key]: value };
      setState(nextState);
      const newErrors = validationFunc(nextState);
      const newValidationErrors = new FormValidation(newErrors);
      setErrors(newValidationErrors);
    },
    [state, validationFunc]
  );

  return [state, onChange, errors];
};
