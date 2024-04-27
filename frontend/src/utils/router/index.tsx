import { Routes, Route } from 'react-router-dom';
import WelcomePage from 'src/pages/Welcome';

const Router = () => (
  <Routes>
    <Route path="/" element={<></>}></Route>
    <Route path="/welcome" element={<WelcomePage></WelcomePage>} />
    <Route path="/auth/sign-in" element={<></>} />
  </Routes>
);

export default Router;
