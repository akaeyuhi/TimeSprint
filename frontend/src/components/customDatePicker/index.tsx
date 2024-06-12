import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { ValidationErrors } from 'src/hooks';
import { DeadlineItem } from 'src/models/deadline-item.model';

interface CustomDatePickerProps<T extends DeadlineItem> {
  formData: T;
  setFormData: (key: keyof T, value: Date) => void;
  errors: ValidationErrors<T>;
  type: 'endDate' | 'startDate';
}

const CustomDatePicker = <T extends DeadlineItem>({
  errors,
  formData,
  setFormData,
  type,
}: CustomDatePickerProps<T>) => {
  const label = type === 'startDate' ? 'Start date' : 'End date';
  const errorText =
    type === 'startDate' ?
      'Start date should be before end' :
      'End date should be later than start';

  return (
    <DatePicker
      label={label}
      disablePast={true}
      slotProps={{
        textField: {
          error: errors[type],
          helperText: errors[type] ? errorText : '',
        },
      }}
      onChange={(newValue) =>
        setFormData(type, newValue?.toDate() ?? new Date())
      }
      value={dayjs(formData.endDate)}
    />
  );
};

export default CustomDatePicker;
