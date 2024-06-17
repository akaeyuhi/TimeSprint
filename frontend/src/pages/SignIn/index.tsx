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
import { LoginDto } from 'src/services/dto/login.dto';
import { useStore } from 'src/hooks';
import Loader from 'src/components/loader';
import { observer } from 'mobx-react';
import { useValidation, ValidationErrors } from 'src/hooks/use-validation';

export const passwordRegex = new RegExp(
  '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}$'
);

const validate = (state: LoginDto): ValidationErrors<LoginDto> => ({
  email: !state.email,
  password: !(state.password.length > 8 && passwordRegex.test(state.password)),
});

const SignInPage = () => {
  const store = useStore('authStore');
  const handler = useStore('handler');
  const navigate = useNavigate();
  const { error, isLoading } = store;
  const [data, setData, validation] = useValidation(
    {
      email: '',
      password: '',
    },
    validate
  );

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (validation.validate()) {
      await store.login(data);
      if (!error && store.auth && store.isAuthenticated) navigate('/home');
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
            Sign in
          </Typography>
        </Stack>
        <Stack component="form" sx={styles.container}>
          <FormControl sx={styles.form} error={validation.errors.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
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
          <FormControl sx={styles.form} error={validation.errors.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type="password"
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
        </Stack>
        <Stack sx={styles.buttonBox}>
          <Button onClick={handleSubmit}>Sign In</Button>
          <Link to="/auth/sign-up" style={{ textDecoration: 'none' }}>
            <Button color="secondary">Sign Up</Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default observer(SignInPage);
