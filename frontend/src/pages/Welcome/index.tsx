import { Box, Button, Container, Typography } from '@mui/material';
import { styles } from './styles';
import Logo from 'src/components/logo';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => (
  <>
    <Container component="main" maxWidth="xs" sx={styles.root}>
      <Box sx={styles.centeredBox}>
        <Box sx={styles.headingBox}>
          <Logo/>
          <Typography variant="h2" sx={{ marginLeft: '0.25rem' }}>
              TimeSprinter
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={styles.slogan} gutterBottom>
              Task management at the speed of light.
          </Typography>
          <Typography variant="body1" sx={styles.description} gutterBottom>
              TimeSprinter helps you organize and manage your tasks efficiently,
              allowing you to focus on what matters most.
          </Typography>
        </Box>
        <Box sx={styles.buttonBox}>
          <Link to="/auth/sign-in" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" sx={styles.button}>
                Sign In
            </Button>
          </Link>
          <Link to="/auth/sign-up" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" sx={styles.button}>
                Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  </>

);

export default WelcomePage;
