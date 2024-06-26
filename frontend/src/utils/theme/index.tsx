import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import { useMemo } from 'react';
import { palette } from './palette';
import { typography } from './typography';
import GlobalStyles from 'src/utils/theme/GlobalStyles';
import { overrides } from './overrides';

type ThemeConfigProps = {
  children: React.ReactNode;
};

const ThemeConfig = ({ children }: ThemeConfigProps) => {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      typography,
      palette,
      components: overrides,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
