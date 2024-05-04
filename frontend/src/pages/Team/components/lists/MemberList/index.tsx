import { Avatar, Grid, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import React from 'react';
import { User } from 'src/models/user.model';

interface MemberListProps {
  members: User[]
}

export const MemberList: React.FC<MemberListProps> = ({ members }) => (
  <Grid container spacing={2}>
    {members.map(member => (
      <Grid item key={member.id} xs={8} md={4}>
        <Avatar alt={member.username} src="#" sx={styles.modalAvatar}/>
        <Typography align="center">{member.username}</Typography>
      </Grid>
    ))}
  </Grid>
);
