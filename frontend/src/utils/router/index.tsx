import { Routes, Route } from 'react-router-dom';
import WelcomePage from 'src/pages/Welcome';
import SignInPage from 'src/pages/SignIn';
import SignUpPage from 'src/pages/SignUp';
import HomePage from 'src/pages/Home';
import Layout from 'src/components/layout';

const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="home" element={<HomePage />} />
    </Route>
    <Route path="/welcome" element={<WelcomePage />} />
    <Route path="/auth/">
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
    </Route>
  </Routes>
);

export default Router;
