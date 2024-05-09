import React from 'react';
import { ModalHandler } from 'src/hooks/use-modals';
import { Team } from 'src/models/team.model';
import { Avatar, AvatarGroup, Box, Button, Stack, Typography } from '@mui/material';
import { styles } from 'src/pages/Team/styles';
import { stringAvatar } from 'src/utils/common/stringAvatar';
import ModalInfo from 'src/components/modalInfo';
import { MemberList } from 'src/pages/Team/components/lists/MemberList';

interface MembersSectionProps {
  members: ModalHandler,
  admins: ModalHandler,
  addUser: ModalHandler,
  addAdmin: ModalHandler
  team: Team,
}


const MembersSection: React.FC<MembersSectionProps> = ({
  members,
  admins,
  addUser,
  addAdmin,
  team,
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
        <Button
          variant="outlined"
          color="primary"
          onClick={addUser?.open}
          sx={{ ml: '0.5rem' }}
        >
            Add new member
        </Button>
      </Box>
      <Box sx={styles.avatarBox}>
        <AvatarGroup max={10}>
          {team?.members.map(member => (
            <Avatar key={member.id} {...stringAvatar(member.username)} />
          ))}
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
        <Button
          variant="outlined"
          color="primary"
          onClick={addAdmin?.open}
          sx={{ ml: '0.5rem' }}
        >
            Add new admin
        </Button>
      </Box>
      <Box sx={styles.avatarBox}>
        <AvatarGroup max={10}>
          {team?.admins.map(admin => (
            <Avatar key={admin.id} {...stringAvatar(admin.username)} />
          ))}
        </AvatarGroup>
      </Box>
    </Stack>
    <ModalInfo
      open={members.isOpen}
      handleClose={members.close}
      title="Team Members">
      <MemberList members={team.members}/>
    </ModalInfo>
    <ModalInfo
      open={admins.isOpen}
      handleClose={admins.close}
      title="Team Admins">
      <MemberList members={team.admins}/>
    </ModalInfo>
  </>
);

export default MembersSection;
