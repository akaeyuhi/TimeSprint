import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, Container, Typography } from '@mui/material';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div role="alert">
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorIcon color="primary" sx={{ width: 150, height: 150 }}></ErrorIcon>
      <Typography variant="h4" mt={2}>
        Something went wrong:
      </Typography>
      <Typography variant="body1" mt={2}>
        <pre>{error.message}</pre>
      </Typography>
      <Box mt={2}>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </Box>
    </Container>
  </div>
);

export default ErrorFallback;
