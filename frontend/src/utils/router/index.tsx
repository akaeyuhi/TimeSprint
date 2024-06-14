import { Navigate, Route, Routes } from 'react-router-dom';
import WelcomePage from 'src/pages/Welcome';
import SignInPage from 'src/pages/SignIn';
import SignUpPage from 'src/pages/SignUp';
import HomePage from 'src/pages/Home';
import TeamsPage from 'src/pages/Teams';
import TeamPage from 'src/pages/Team';
import ProjectPage from 'src/pages/Project';
import TaskPage from 'src/pages/Tasks';
import UserPage from 'src/pages/User';
import PrivateLayout from './PrivateLayout';
import PublicLayout from 'src/utils/router/PublicLaylout';
import ActivityPage from 'src/pages/Activities';

const Router = () => (
  <Routes>
    <Route path="/" element={<PrivateLayout />}>
      <Route path="home" element={<HomePage />} />
      <Route path="teams" element={<TeamsPage />} />
      <Route path="teams/:id" element={<TeamPage />} />
      <Route path="teams/:id/projects/:id" element={<ProjectPage />} />
      <Route path="tasks" element={<TaskPage />} />
      <Route path="activities" element={<ActivityPage />} />
      <Route path="user" element={<UserPage />} />
      <Route path="user/:id" element={<UserPage />} />
    </Route>
    <Route path="/welcome" element={<WelcomePage />} />
    <Route path="/auth/" element={<PublicLayout />}>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/home" />} />
  </Routes>
);

export default Router;
