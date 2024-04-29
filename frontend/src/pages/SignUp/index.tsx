import { Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';
import Logo from 'src/components/logo';
import SignUpForm from 'src/components/signUpForm';

const SignUpPage = () => (
  <Container sx={styles.mainContainer}>
    <Stack sx={styles.formContainer}>
      <Stack sx={styles.logoBox}>
        <Logo />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Sign up
        </Typography>
      </Stack>
      <SignUpForm />
      <Stack sx={styles.buttonBox}>
        <Button>Sign Up</Button>
        <Link to="/auth/sign-in" style={{ textDecoration: 'none' }}>
          <Button color="secondary">Sign In</Button>
        </Link>
      </Stack>
    </Stack>
  </Container>
);

export default SignUpPage;
