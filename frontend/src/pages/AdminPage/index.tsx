import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { AdminRole } from 'src/models/roles.enum';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'src/hooks';
import DataFetcher from 'src/pages/AdminPage/components/DataFetcher';

const AdminPage: React.FC = () => {
  const authStore = useStore('authStore');
  const { id, role } = authStore.auth.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== AdminRole.ADMIN) {
      navigate('/app/home');
    }
  }, [id, navigate, role]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Admin page</Typography>
      <DataFetcher />
    </Container>
  );
};

export default observer(AdminPage);
