import { Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";

// Dashboards
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";

// Extra pages
import FillForm from "./Pages/FillForm";
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/app/Register' element={<Register />} />
      <Route path='/app/SignIn' element={<SignIn />} />

      {/* User Dashboard */}
      <Route path='/app/user/dashboard' element={<UserDashboard />} />

      {/* Admin Dashboard */}
      <Route path='/app/admin/dashboard' element={<AdminDashboard />} />

      {/* Fill Form */}
      <Route path='/app/FillForm' element={<FillForm />} />

      {/* Catch All */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
