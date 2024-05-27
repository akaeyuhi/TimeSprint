import { CircularProgress, Container } from '@mui/material';

const Loader = () => (
  <Container sx={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }}>
    <CircularProgress />
  </Container>
);

export default Loader;
