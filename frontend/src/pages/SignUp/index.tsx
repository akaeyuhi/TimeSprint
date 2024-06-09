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
import { useStore } from 'src/hooks';
import Loader from 'src/components/loader';
import { RegisterDto } from 'src/services/dto/auth/register.dto';
import { observer } from 'mobx-react';

export const passwordRegex = new RegExp(
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}$',
);

const SignUpPage = () => {
  const store = useStore('authStore');
  const handler = useStore('handler');
  const navigate = useNavigate();
  const { error, isLoading } = store;
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  } as RegisterDto);
  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const passwordValidate = data.password.length > 8 && passwordRegex.test(data.password);
  const confirmPasswordValidate = data.confirmPassword.length > 0 &&
    data.password === data.confirmPassword;
  const usernameValidate = data.username.length > 8;
  const emailValidate = !!data.email;

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    setErrors({
      email: !emailValidate,
      username: !usernameValidate,
      password: !passwordValidate,
      confirmPassword: !confirmPasswordValidate,
    });
    if (!(errors.email || errors.username || errors.password || errors.confirmPassword)) {
      await store.register(data);
      if (!error && store.auth) navigate('/home');
    }
  };

  if (isLoading) return  <Container sx={styles.mainContainer}><Loader /></Container>;
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
        <Stack component="form" sx={styles.container}>
          <FormControl sx={styles.form} error={errors.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" required
              aria-describedby="email-error"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })} />
            {errors.email && <FormHelperText error id="email-error">Must be email</ FormHelperText>}
          </FormControl>
          <FormControl sx={styles.form} error={errors.username}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" required
              aria-describedby="username-error"
              value={data.username}

              onChange={(e) => setData({ ...data, username: e.target.value })} />
            {errors.username && <FormHelperText error id="username-error">
              Username must be 8 characters or longer
            </ FormHelperText>}
          </FormControl>
          <FormControl sx={styles.form} error={errors.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" required error={errors.password}
              aria-describedby="password-error"
              value={data.password}

              onChange={(e) => setData({ ...data, password: e.target.value })} />
            {errors.password && <FormHelperText error id="password-error">
              Password mush have 8 characters, 1 number,
              1 uppercase and lowercase character and 1 special character
            </ FormHelperText>}
          </FormControl>
          <FormControl sx={styles.form} error={errors.confirmPassword}>
            <InputLabel htmlFor="confirm">Confirm password</InputLabel>
            <Input id="confirm" type="password" required
              aria-describedby="confirm-error"
              value={data.confirmPassword}
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
            {errors.confirmPassword && <FormHelperText error id="confirm-error">
              Passwords do not match
            </FormHelperText>}
          </FormControl>
        </Stack>
        <Stack sx={styles.buttonBox}>
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Link to="/auth/sign-in" style={{ textDecoration: 'none' }}>
            <Button color="secondary">Sign In</Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default observer(SignUpPage);
