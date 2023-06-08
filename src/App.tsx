import { Route, Routes } from "react-router-dom";
import Announcements from "./components/Dashboard/Announcements/Announcements";
import Definitions from "./components/Dashboard/Definitions/Definitions";
import Organizations from "./components/Dashboard/Organizations/Organizations";
import Topics from "./components/Dashboard/Topics/Topics";
import Users from "./components/Dashboard/Users/Users";
import DashboardLayout from "./layouts/DashboardLayout";
import Layout from "./layouts/Layout";
import AnnouncementPage from "./pages/AnnouncementPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import FlashcardPage from "./pages/FlashcardPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import PomodoroPage from "./pages/PomodoroPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";
import RegistrationPage from "./pages/RegistrationPage";
import RequireAuth from "./pages/RequireAuth";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* private routes */}
        <Route element={<RequireAuth allowedRole="USER" />}>
          <Route path="timer" element={<PomodoroPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route path="flashcards/:id" element={<FlashcardPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="announcements/:id" element={<AnnouncementPage />} />
          <Route path="payment" element={<PaymentPage />} />
        </Route>

        {/* admin */}
        <Route element={<RequireAuth allowedRole="ADMIN" />}>
          <Route path="dashboard/" element={<DashboardLayout />}>
            <Route path="definitions" element={<Definitions />} />
            <Route path="topics" element={<Topics />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
