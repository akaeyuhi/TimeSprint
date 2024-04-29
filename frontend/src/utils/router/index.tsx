import { Routes, Route } from 'react-router-dom';
import WelcomePage from 'src/pages/Welcome';
import SignInPage from 'src/pages/SignIn';
import SignUpPage from 'src/pages/SignUp';

const Router = () => (
  <Routes>
    <Route path="/" element={<></>}></Route>
    <Route path="/welcome" element={<WelcomePage />} />
    <Route path="/auth/sign-in" element={<SignInPage />} />
    <Route path="/auth/sign-up" element={<SignUpPage />} />
  </Routes>
);

export default Router;
