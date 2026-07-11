import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import CandidateList from "./pages/CandidateList";
import CandidateDetails from "./pages/CandidateDetails";
import AIAnalysis from "./pages/AIAnalysis";
import ResumeSearch from "./pages/ResumeSearch";
import JDMatching from "./pages/JDMatching";
import CandidateRanking from "./pages/CandidateRanking";
import Analytics from "./pages/Analytics";
import ChatHistory from "./pages/ChatHistory";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/candidates" element={<CandidateList />} />
        <Route path="/candidate/:id" element={<CandidateDetails />} />
        <Route path="/search" element={<ResumeSearch />} />
        <Route path="/matching" element={<JDMatching />} />
        <Route path="/ranking" element={<CandidateRanking />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/chat" element={<ChatHistory />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;