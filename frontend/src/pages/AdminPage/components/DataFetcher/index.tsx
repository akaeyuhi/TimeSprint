import React, { useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { observer } from 'mobx-react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DataModels } from 'src/pages/AdminPage/utils/models.enum';
import generateColumns from 'src/pages/AdminPage/utils/generateRows';
import { RootService } from 'src/services';
import { getItems } from 'src/pages/AdminPage/utils/getItems';

const DataFetcher: React.FC = () => {
  const [selectedService, setSelectedService] = useState<DataModels>(
    DataModels.USER
  );
  const [rows, setRows] = useState<any[]>([]);
  const [cols, setCols] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems(selectedService as keyof RootService);
      if (fetchedItems) {
        const cols = generateColumns(fetchedItems as any);
        setCols(cols);
        setRows(fetchedItems);
      }
    };

    fetchItems();
  }, [selectedService]);

  const handleServiceChange = (event: SelectChangeEvent<DataModels>) => {
    setSelectedService(event.target.value as DataModels);
  };

  return (
    <Box sx={{ width: '100%' }} mt={2}>
      <FormControl sx={{ width: '10%' }}>
        <InputLabel id="service-select-label">Select model</InputLabel>
        <Select
          labelId="service-select-label"
          value={selectedService}
          onChange={handleServiceChange}
          label="Select model"
        >
          {Object.values(DataModels).map((serviceName) => (
            <MenuItem key={serviceName} value={serviceName}>
              {serviceName.slice(0, -7)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack mt={2}>
        <DataGrid
          loading={!rows || rows.length === 0}
          rows={rows}
          columns={cols}
          autoHeight
          disableRowSelectionOnClick
          checkboxSelection
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Stack>
    </Box>
  );
};

export default observer(DataFetcher);
