import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import LoginPage from './pages/Login'
import SignupPage from "./pages/Signup";
import EmployerPage from "./pages/Employer";
import UserProfilePage from "./pages/UserProfile";
import JobListingPage from "./pages/JobListingPage";
import JobDetailPage from "./pages/JobDetail";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<JobListingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/employer" element={<EmployerPage />} />
      <Route path="/freelancer/:id" element={<UserProfilePage />} />
      <Route path="/job/:id" element={<JobDetailPage />} />

    </>
  )
);

export default router;