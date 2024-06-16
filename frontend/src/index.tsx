import React from 'react';
import ReactDOM from 'react-dom/client';
import 'typeface-jost';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppConfig } from 'src/utils/components/AppConfig';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const app =
  process.env.REACT_APP_IS_PRODUCTION === 'true' ? (
    <App />
  ) : (
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <App />
    </DevSupport>
  );

root.render(<AppConfig>{app}</AppConfig>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
