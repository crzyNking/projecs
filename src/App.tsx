import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ToastContainer } from './components/Toast'
import { Chatbot } from './components/Chatbot'
import { Home } from './pages/Home'
import Programs from './pages/Programs'
import SeniorHigh from './pages/SeniorHigh'
import Enrollment from './pages/Enrollment'
import KindergartenEnrollment from './pages/enrollment/KindergartenEnrollment'
import ElementaryEnrollment from './pages/enrollment/ElementaryEnrollment'
import JuniorHighEnrollment from './pages/enrollment/JuniorHighEnrollment'
import SeniorHighEnrollment from './pages/enrollment/SeniorHighEnrollment'
import CollegeEnrollment from './pages/enrollment/CollegeEnrollment'
import { AuthCallback } from './pages/AuthCallback'
import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'
import { Profile } from './pages/Profile'
import { Analytics } from './pages/Analytics'
import { Reports } from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Chatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/senior-high" element={<SeniorHigh />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/enrollment/kindergarten" element={<KindergartenEnrollment />} />
          <Route path="/enrollment/elementary" element={<ElementaryEnrollment />} />
          <Route path="/enrollment/junior-high" element={<JuniorHighEnrollment />} />
          <Route path="/enrollment/senior-high" element={<SeniorHighEnrollment />} />
          <Route path="/enrollment/college" element={<CollegeEnrollment />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
