import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ToastContainer } from './components/Toast'
import { Chatbot } from './components/Chatbot'
import { Home } from './pages/Home'
import Programs from './pages/Programs'
import SeniorHigh from './pages/SeniorHigh'
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
