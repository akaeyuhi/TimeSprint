import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { FormValidation } from 'src/hooks/use-validation';
import { styles } from 'src/components/modalForm/styles';
import { ItemDto } from 'src/services/dto/item.dto';
import { Item } from 'src/models/item.model';

interface ItemFormProps<T extends ItemDto, K extends Item> {
  onSubmit: (newItem: T, id?: number) => void;
  onCancel: () => void;
  formData: T;
  setFormData: (key: keyof T, value: any) => void;
  isEdited?: boolean;
  item: K | null;
  validation: FormValidation<T>;
  children: React.ReactNode;
}

const ItemForm = <T extends ItemDto, K extends Item>({
  item,
  onSubmit,
  onCancel,
  formData,
  setFormData,
  isEdited = false,
  validation,
  children,
}: ItemFormProps<T, K>) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validation.validate())
      onSubmit(
        {
          ...formData,
        } as T,
        item?.id
      );
  };

  return (
    <Stack component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom mb={2}>
        {isEdited ? 'Edit' : 'Create'} Item
      </Typography>
      <FormControl error={validation.errors.name}>
        <InputLabel htmlFor="name">Task name</InputLabel>
        <OutlinedInput
          id="name"
          type="text"
          label="Task name"
          onChange={(e) => setFormData('name', e.target.value)}
          required
          aria-describedby="name-error"
          value={formData.name}
        />
        {validation.errors.name && (
          <FormHelperText error id="name-error">
            Name should be 8 characters long
          </FormHelperText>
        )}
      </FormControl>
      <FormControl error={validation.errors.description}>
        <InputLabel htmlFor="description">Task description</InputLabel>
        <OutlinedInput
          id="description"
          type="text"
          label="Task description"
          aria-describedby="desc-error"
          onChange={(e) => setFormData('description', e.target.value)}
          required
          value={formData.description}
        />
        {validation.errors.description && (
          <FormHelperText error id="desc-error">
            Description should be 20 characters long
          </FormHelperText>
        )}
      </FormControl>
      {children}
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" color="primary" type="submit">
          {isEdited ? 'Edit' : 'Create'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Stack>
  );
};

export default ItemForm;
