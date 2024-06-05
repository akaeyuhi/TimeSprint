import { FC, ReactNode, StrictMode } from 'react';
import ThemeConfig from 'src/utils/theme';
import RootStoreProvider from 'src/stores';
import { store } from 'src/stores/root.store';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'src/utils/components/ErrorFallback';

type Props = {
  children: ReactNode;
};

export const AppConfig: FC<Props> = ({ children }) => (
  <StrictMode>
    <BrowserRouter>
      <ThemeConfig>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <RootStoreProvider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover
              draggable />
          </RootStoreProvider>
        </ErrorBoundary>

      </ThemeConfig>
    </BrowserRouter>
  </StrictMode>
);
