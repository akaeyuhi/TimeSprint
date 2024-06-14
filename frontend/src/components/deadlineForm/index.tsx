import React from 'react';
import { FormControl } from '@mui/material';
import { FormValidation } from 'src/hooks/use-validation';
import { DeadlineItem } from 'src/models/deadline-item.model';
import ItemForm from 'src/components/itemForm';
import CustomDatePicker from 'src/components/customDatePicker';
import { ItemDto } from 'src/services/dto/item.dto';
import { Item } from 'src/models/item.model';

interface DeadlineFormProps<T extends DeadlineItem & ItemDto, K extends Item> {
  onSubmit: (newItem: T, id?: number) => void;
  onCancel: () => void;
  formData: T;
  setFormData: (key: keyof T, value: any) => void;
  isEdited?: boolean;
  item: K | null;
  validation: FormValidation<T>;
  children?: React.ReactNode;
}

const DeadlineForm = <T extends DeadlineItem & ItemDto, K extends Item>({
  item,
  onSubmit,
  onCancel,
  formData,
  setFormData,
  isEdited = false,
  validation,
  children,
}: DeadlineFormProps<T, K>) => (
  <ItemForm<T, K>
    item={item}
    validation={validation}
    formData={formData}
    onCancel={onCancel}
    onSubmit={onSubmit}
    isEdited={isEdited}
    setFormData={setFormData}
  >
    {children}
    <FormControl>
      <CustomDatePicker
        formData={formData}
        setFormData={setFormData}
        errors={validation.errors}
        type="startDate"
      />
    </FormControl>
    <FormControl>
      <CustomDatePicker
        formData={formData}
        setFormData={setFormData}
        errors={validation.errors}
        type="endDate"
      />
    </FormControl>
  </ItemForm>
);

export default DeadlineForm;
