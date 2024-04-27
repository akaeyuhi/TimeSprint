import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<></>}>
        </Route>
        <Route path="/auth/sign-in" element={<></>} />
      </Routes>
  );
};

export default Router;
