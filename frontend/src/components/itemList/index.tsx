import { Grid, Typography } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react';
import { Item } from 'src/models/item.model';

interface ItemListProps<T extends Item> {
  items: T[];
  ItemComponent: React.ComponentType<{ item: T } & any>;
  itemComponentProps?: Omit<any, 'item'>; // Props for the ItemComponent excluding 'item'
}

const ItemList = <T extends Item>({
  items,
  ItemComponent,
  itemComponentProps,
}: ItemListProps<T>) => (
  <>
    {!items || items.length === 0 ? (
      <Typography variant="h5" sx={{ mt: '1rem' }}>
        No items available
      </Typography>
    ) : (
      <Grid container spacing={2} sx={{ mt: '1rem' }}>
        {items.map((item) => (
          <Grid item xs={12} key={item.id}>
            <ItemComponent item={item} {...itemComponentProps} />
          </Grid>
        ))}
      </Grid>
    )}
  </>
);

export default observer(ItemList);
