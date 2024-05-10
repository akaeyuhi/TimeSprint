import React from 'react';
import { FormControl, Input, InputLabel, Stack } from '@mui/material';
import { styles } from 'src/pages/SignIn/components/signInForm/styles';

const SignInForm = () => (
  <Stack component="form" sx={styles.container}>
    <FormControl sx={styles.form}>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input id="email" type="email" />
    </FormControl>
    <FormControl sx={styles.form}>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input id="password" type="password" />
    </FormControl>
  </Stack>
);

export default SignInForm;
