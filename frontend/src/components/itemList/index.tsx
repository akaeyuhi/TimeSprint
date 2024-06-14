import { Grid, Typography } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react';
import { Item } from 'src/models/item.model';

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
      <Typography variant="h5" sx={{ mt: '1rem' }}>
        No items available
      </Typography>
    ) : (
      <Grid container spacing={2} mt={2} alignItems="stretch">
        {children}
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} {...itemComponentProps} />
        ))}
      </Grid>
    )}
  </>
);

export default observer(ItemList);
