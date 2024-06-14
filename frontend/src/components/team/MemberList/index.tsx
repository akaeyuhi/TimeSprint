import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import { User } from 'src/models/user.model';
import { useStore } from 'src/hooks';
import CancelIcon from '@mui/icons-material/Cancel';

interface MemberListProps {
  members: User[];
  isAdmin?: boolean;
  onDelete: (user: User) => void;
}

export const MemberList: React.FC<MemberListProps> = ({
  members,
  onDelete,
  isAdmin = false,
}) => {
  const { id } = useStore('authStore').auth.user;

  const handleDelete = (user: User) => {
    onDelete(user);
  };

  return (
    <Grid container spacing={2}>
      {members.map((member) => (
        <Grid item key={member.id} xs={8} md={4}>
          <Box sx={styles.avatarBox}>
            <Avatar alt={member.username} src="#" sx={styles.modalAvatar} />
            {isAdmin && member.id !== id && (
              <Box
                className="deleteButton"
                sx={styles.deleteButton}
                onClick={() => handleDelete(member)}
              >
                <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
              </Box>
            )}
          </Box>
          <Typography align="center">{member.username}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};
