import {
  Button,
  Container,
  FormControl, FormHelperText,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';
import Logo from 'src/components/logo';
import { LoginDto } from 'src/services/dto/auth/login.dto';
import { useStore } from 'src/hooks';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';

export const passwordRegex = new RegExp(
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}$',
);


const SignInPage = () => {
  const store = useStore('authStore');
  const handler = useStore('handler');
  const navigate = useNavigate();
  const { error, isLoading } = store;
  const [data, setData] = useState({
    email: '',
    password: '',
  } as LoginDto);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const passwordValidate = data.password.length > 8 && passwordRegex.test(data.password);
  const emailValidate = !!data.email;

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    setErrors({
      email: !emailValidate,
      password: !passwordValidate,
    });
    if (!(errors.email || errors.password)) {
      await store.login(data);
      if (!error && store.auth && store.isAuthenticated) navigate('/home');
    }
  };

  if (isLoading) return <Container sx={styles.mainContainer}><Loader /></Container>;
  if (error) handler.handle(error.message);

  return <Container sx={styles.mainContainer}>
    <Stack sx={styles.formContainer}>
      <Stack sx={styles.logoBox}>
        <Logo />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Sign in
        </Typography>
      </Stack>
      <Stack component="form" sx={styles.container}>
        <FormControl sx={styles.form} error={errors.email}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" type="email" required
            aria-describedby="email-error"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })} />
          {errors.email && <FormHelperText error id="email-error">Must be email</ FormHelperText>}
        </FormControl>
        <FormControl sx={styles.form} error={errors.password}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" required
            aria-describedby="password-error"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })} />
          {errors.password && <FormHelperText error id="password-error">
            Password mush have 8 characters, 1 number,
            1 uppercase and lowercase character and 1 special character
          </ FormHelperText>}
        </FormControl>
      </Stack>
      <Stack sx={styles.buttonBox}>
        <Button onClick={handleSubmit}>Sign In</Button>
        <Link to="/auth/sign-up" style={{ textDecoration: 'none' }}>
          <Button color="secondary">Sign Up</Button>
        </Link>
      </Stack>
    </Stack>
  </Container>;
};

export default observer(SignInPage);
