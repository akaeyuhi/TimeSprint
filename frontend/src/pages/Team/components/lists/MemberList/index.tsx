import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import { User } from 'src/models/user.model';

interface MemberListProps {
  members: User[];
  onDelete: (id: number) => void;
}

export const MemberList: React.FC<MemberListProps> = ({ members, onDelete }) => {
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <Grid container spacing={2}>
      {members.map(member => (
        <Grid item key={member.id} xs={8} md={4}>
          <Box sx={styles.avatarBox}>
            <Avatar alt={member.username} src="#" sx={styles.modalAvatar} />
            <Box className="deleteButton"
              sx={styles.deleteButton}
              onClick={() => handleDelete(member.id)}>
              X
            </Box>
          </Box>
          <Typography align="center">{member.username}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};
