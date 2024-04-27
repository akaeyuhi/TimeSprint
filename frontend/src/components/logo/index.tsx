import logoImg from '@src/assets/logo-100.svg';
import { Stack } from '@mui/material';

const Logo = () => {
  return (
      <Stack justifyContent="center" alignItems="center" padding="5px">
        <img src={logoImg}  alt={"app logo"}/>
      </Stack>
  );
};

export default Logo;
