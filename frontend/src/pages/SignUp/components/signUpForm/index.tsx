import React from 'react';
import { FormControl, Input, InputLabel, Stack } from '@mui/material';
import { styles } from 'src/pages/SignUp/components/signUpForm/styles';

const SignUpForm = () => (
  <Stack component="form" sx={styles.container}>
    <FormControl sx={styles.form}>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input id="email" type="email" />
    </FormControl>
    <FormControl sx={styles.form}>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input id="password" type="password" />
    </FormControl>
    <FormControl sx={styles.form}>
      <InputLabel htmlFor="confirm">Confirm password</InputLabel>
      <Input id="confirm" type="confirm" />
    </FormControl>
  </Stack>
);

export default SignUpForm;
