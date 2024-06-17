import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';
import Logo from 'src/components/logo';
import { useStore } from 'src/hooks';
import Loader from 'src/components/loader';
import { RegisterDto } from 'src/services/dto/register.dto';
import { observer } from 'mobx-react';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';

export const passwordRegex = new RegExp(
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}$'
);

const validate = (state: RegisterDto): ValidationErrors<RegisterDto> => ({
  email: !state.email,
  username: !(state.username.length > 8),
  password: !(state.password.length > 8 && passwordRegex.test(state.password)),
  confirmPassword: !(
    state.confirmPassword.length > 0 && state.password === state.confirmPassword
  ),
});

const SignUpPage = () => {
  const store = useStore('authStore');
  const handler = useStore('handler');
  const navigate = useNavigate();
  const { error, isLoading } = store;
  const [data, setData, validation] = useValidation<RegisterDto>(
    {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate
  );

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (validation.validate()) {
      await store.register(data);
      if (!error && store.auth) navigate('/app/home');
    }
  };

  if (isLoading)
    return (
      <Container sx={styles.mainContainer}>
        <Loader />
      </Container>
    );
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
          <FormControl sx={styles.form} error={validation.errors.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              required
              aria-describedby="email-error"
              value={data.email}
              label="Email"
              onChange={(e) => setData('email', e.target.value)}
            />
            {validation.errors.email && (
              <FormHelperText error id="email-error">
                Must be email
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={styles.form} error={validation.errors.username}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              id="username"
              type="text"
              required
              aria-describedby="username-error"
              value={data.username}
              label="Username"
              onChange={(e) => setData('username', e.target.value)}
            />
            {validation.errors.username && (
              <FormHelperText error id="username-error">
                Username must be 8 characters or longer
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={styles.form} error={validation.errors.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type="password"
              required
              error={validation.errors.password}
              aria-describedby="password-error"
              value={data.password}
              label="Password"
              onChange={(e) => setData('password', e.target.value)}
            />
            {validation.errors.password && (
              <FormHelperText error id="password-error">
                Password mush have 8 characters, 1 number, 1 uppercase and
                lowercase character and 1 special character
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={styles.form}
            error={validation.errors.confirmPassword}
          >
            <InputLabel htmlFor="confirm">Confirm password</InputLabel>
            <OutlinedInput
              id="confirm"
              type="password"
              aria-describedby="confirm-error"
              value={data.confirmPassword}
              label="Confirm password"
              onChange={(e) => setData('confirmPassword', e.target.value)}
            />
            {validation.errors.confirmPassword && (
              <FormHelperText error id="confirm-error">
                Passwords do not match
              </FormHelperText>
            )}
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
