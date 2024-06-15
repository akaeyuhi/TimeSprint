import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react';
import { Item } from 'src/models/item.model';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styles } from './styles';

interface ItemListProps<T extends Item> {
  items: T[];
  ItemComponent: React.ComponentType<{ item: T } & any>;
  itemComponentProps?: Omit<any, 'item'>; // Props for the ItemComponent excluding 'item'
  children?: React.ReactNode;
}

const ItemList = <T extends Item>({
  items,
  ItemComponent,
  itemComponentProps,
  children,
}: ItemListProps<T>) => (
  <>
    {!items || items?.length === 0 ? (
      <Box sx={styles.mockBox}>
        <AccessTimeIcon color="primary" sx={styles.icon} />
        <Typography variant="h5" sx={{ mt: '1rem' }}>
          No items available. Maybe you should create one?
        </Typography>
      </Box>
    ) : (
      <Grid container spacing={2} mt={1} alignItems="stretch">
        {children}
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} {...itemComponentProps} />
        ))}
      </Grid>
    )}
  </>
);

export default observer(ItemList);
