import React from 'react';
import { ModalHandler } from 'src/hooks/use-modals';
import { Team } from 'src/models/team.model';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import { stringAvatar } from 'src/utils/common/stringAvatar';
import ModalInfo from 'src/components/modalInfo';
import { MemberList } from 'src/components/team/MemberList';
import { User } from 'src/models/user.model';

interface MembersSectionProps {
  members: ModalHandler;
  admins: ModalHandler;
  addUser: ModalHandler;
  addAdmin: ModalHandler;
  team: Team;
  isAdmin?: boolean;
  onDeleteUser: (user: User) => void;
  onDeleteAdmin: (user: User) => void;
}

const MembersSection: React.FC<MembersSectionProps> = ({
  members,
  admins,
  addUser,
  addAdmin,
  team,
  isAdmin = false,
  onDeleteUser,
  onDeleteAdmin,
}) => (
  <>
    <Stack>
      <Box mt={3} sx={styles.textBox}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Members
        </Typography>
        <Button variant="outlined" color="primary" onClick={members.open}>
          View All
        </Button>
        {isAdmin && (
          <Button
            variant="outlined"
            color="primary"
            onClick={addUser?.open}
            sx={{ ml: '0.5rem' }}
          >
            Add new member
          </Button>
        )}
      </Box>
      <Box sx={styles.avatarBox}>
        <AvatarGroup max={10}>
          {team && team?.members?.length ? (
            team.members.map((member) => (
              <Avatar key={member.id} {...stringAvatar(member.username)} />
            ))
          ) : (
            <Typography variant="body1">No members for now</Typography>
          )}
        </AvatarGroup>
      </Box>
    </Stack>
    <Stack>
      <Box mt={3} sx={styles.textBox}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Admins
        </Typography>
        <Button variant="outlined" color="primary" onClick={admins?.open}>
          View All
        </Button>
        {isAdmin && (
          <Button
            variant="outlined"
            color="primary"
            onClick={addAdmin?.open}
            sx={{ ml: '0.5rem' }}
          >
            Add new admin
          </Button>
        )}
      </Box>
      <Box sx={styles.avatarBox}>
        <AvatarGroup max={10}>
          {team && team?.admins?.length ? (
            team.admins.map((admin) => (
              <Avatar key={admin.id} {...stringAvatar(admin.username)} />
            ))
          ) : (
            <Typography variant="body1">No admins for now</Typography>
          )}
        </AvatarGroup>
      </Box>
    </Stack>
    <ModalInfo
      open={members.isOpen}
      handleClose={members.close}
      title="Team Members"
    >
      <MemberList
        isAdmin={isAdmin}
        members={team?.members}
        onDelete={onDeleteUser}
      />
    </ModalInfo>
    <ModalInfo
      open={admins.isOpen}
      handleClose={admins.close}
      title="Team Admins"
    >
      <MemberList
        isAdmin={isAdmin}
        members={team?.admins}
        onDelete={onDeleteAdmin}
      />
    </ModalInfo>
  </>
);

export default MembersSection;
