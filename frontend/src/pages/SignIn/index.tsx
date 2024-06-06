import { Button, Container, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';
import Logo from 'src/components/logo';
import { LoginDto } from 'src/services/dto/auth/login.dto';
import { useStore } from 'src/hooks';
import Loader from 'src/components/loader';

const SignInPage = () => {
  const store = useStore('authStore');
  const navigate = useNavigate();
  const { error, isLoading } = store;
  const [data, setData] = useState({} as LoginDto);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await store.login(data);
    navigate('/home');
  };

  if (isLoading) return <Loader />;
  if (error) throw error;

  return <Container sx={styles.mainContainer}>
    <Stack sx={styles.formContainer}>
      <Stack sx={styles.logoBox}>
        <Logo />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Sign in
        </Typography>
      </Stack>
      <Stack component="form" sx={styles.container} onSubmit={handleSubmit}>
        <FormControl sx={styles.form}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="email"
                 onChange={(e) => setData({ ...data, username: e.target.value })} />
        </FormControl>
        <FormControl sx={styles.form}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password"
                 onChange={(e) => setData({ ...data, password: e.target.value })} />
        </FormControl>
      </Stack>
      <Stack sx={styles.buttonBox}>
        <Button>Sign In</Button>
        <Link to="/auth/sign-up" style={{ textDecoration: 'none' }}>
          <Button color="secondary">Sign Up</Button>
        </Link>
      </Stack>
    </Stack>
  </Container>;
};

export default SignInPage;
