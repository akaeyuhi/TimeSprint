import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';
import Logo from 'src/components/logo';
import { useStore } from 'src/hooks';
import Loader from 'src/components/loader';
import { RegisterDto } from 'src/services/dto/auth/register.dto';
import { observer } from 'mobx-react';

const SignUpPage = () => {
  const store = useStore('authStore');
  const handler = useStore('handler');
  const navigate = useNavigate();
  const { error, isLoading } = store;
  const [data, setData] = useState({} as RegisterDto);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await store.register(data);
    if (!error && store.auth) navigate('/home');
  };

  if (isLoading) return <Loader />;
  if (error) handler.handle(error.message);


  return (
    <Container sx={styles.mainContainer}>
      <Stack sx={styles.formContainer}>
        <Stack sx={styles.logoBox}>
          <Logo />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Sign up
          </Typography>
        </Stack>
        <Stack component="form" sx={styles.container} onSubmit={handleSubmit}>
          <FormControl sx={styles.form}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })} />
          </FormControl>
          <FormControl sx={styles.form}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text"
              onChange={(e) => setData({ ...data, username: e.target.value })} />
          </FormControl>
          <FormControl sx={styles.form}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password"
              onChange={(e) => setData({ ...data, password: e.target.value })} />
          </FormControl>
          <FormControl sx={styles.form}>
            <InputLabel htmlFor="confirm">Confirm password</InputLabel>
            <Input id="confirm" type="password"
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
          </FormControl>
          <Stack sx={styles.buttonBox}>
            <Button type="submit">Sign Up</Button>
            <Link to="/auth/sign-in" style={{ textDecoration: 'none' }}>
              <Button color="secondary">Sign In</Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default observer(SignUpPage);
