import { GridColDef } from '@mui/x-data-grid';

/**
 * Generate GridColDef columns based on the provided array of objects.
 * @param rows Array of objects to generate columns from.
 * @param customColumns Optional custom column definitions.
 * @returns Array of GridColDef columns.
 */
export default function generateColumns<T extends object>(
  rows: T[],
  customColumns: Partial<GridColDef>[] = []
): GridColDef[] {
  if (rows.length === 0) return [];

  const exampleRow = rows[0];
  const columns: GridColDef[] = Object.keys(exampleRow).map((key) => {
    let type: GridColDef['type'] = 'string';
    let width = 150;
    const editable = true;
    let headerName = key.charAt(0).toUpperCase() + key.slice(1);
    let valueGetter;

    const value = exampleRow[key as keyof T];

    if (Array.isArray(value)) {
      type = 'string';
      valueGetter = (params: any) =>
        params && params.length ? params.length : 0;
      headerName = `${headerName} (Count)`;
    } else if (value instanceof Date) {
      type = 'date';
      width = 140;
      headerName = `${headerName} (Date)`;
    } else if (typeof value === 'object' && value !== null) {
      type = 'string';
      valueGetter = (params: any) => (params ? params.id : 'null');
      headerName = `${headerName} (id)`;
    } else {
      switch (typeof value) {
        case 'number':
          type = 'number';
          width = 110;
          break;
        case 'boolean':
          type = 'boolean';
          width = 100;
          break;
        case 'string':
        default:
          type = 'string';
          width = 180;
          break;
      }
    }

    return {
      field: key,
      headerName,
      width,
      type,
      editable,
      valueGetter,
    };
  });

  // Apply custom column definitions, overriding any defaults
  customColumns.forEach((customColumn) => {
    const index = columns.findIndex(
      (column) => column.field === customColumn.field
    );
    if (index !== -1) {
      columns[index] = { ...columns[index], ...customColumn };
    }
  });

  return columns;
}
