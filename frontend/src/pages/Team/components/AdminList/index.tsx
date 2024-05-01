import { Avatar, Grid, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import React from 'react';
import { User } from 'src/models/user.model';

interface AdminListProps {
  admins: User[]
}

export const AdminList: React.FC<AdminListProps> = ({ admins }) => (
  <Grid container spacing={2} >
    {admins.map(admin => (
      <Grid item key={admin.id} xs={8} md={4}>
        <Avatar alt={admin.username} src="#" sx={styles.modalAvatar} />
        <Typography align="center">{admin.username}</Typography>
      </Grid>
    ))}
  </Grid>
);
