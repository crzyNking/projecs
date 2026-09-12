import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './components/AdminLayout'
import { ToastContainer } from './components/Toast'
import { Chatbot } from './components/Chatbot'
import { Home } from './pages/Home'
import SeniorHigh from './pages/SeniorHigh'
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
import AdminOverview from './pages/admin/AdminOverview'
import AdminUsers from './pages/admin/AdminUsers'
import AdminEnrollments from './pages/admin/AdminEnrollments'
import AdminActivity from './pages/admin/AdminActivity'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Chatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/senior-high" element={<SeniorHigh />} />
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

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="enrollments" element={<AdminEnrollments />} />
            <Route path="activity" element={<AdminActivity />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
