import logoImg from '@src/assets/logo-100.svg';
import { Stack } from '@mui/material';

const Logo = () => (
  <Stack justifyContent="center" alignItems="center" padding="5px">
    <img src={logoImg} alt={'app logo'} />
  </Stack>
);

export default Logo;
