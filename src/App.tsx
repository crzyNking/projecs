import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ToastContainer } from './components/Toast'
import { Chatbot } from './components/Chatbot'
import { Home } from './pages/Home'

const SeniorHigh = lazy(() => import('./pages/SeniorHigh'))
const KindergartenEnrollment = lazy(() => import('./pages/enrollment/KindergartenEnrollment'))
const ElementaryEnrollment = lazy(() => import('./pages/enrollment/ElementaryEnrollment'))
const JuniorHighEnrollment = lazy(() => import('./pages/enrollment/JuniorHighEnrollment'))
const SeniorHighEnrollment = lazy(() => import('./pages/enrollment/SeniorHighEnrollment'))
const CollegeEnrollment = lazy(() => import('./pages/enrollment/CollegeEnrollment'))
const AuthCallback = lazy(() => import('./pages/AuthCallback'))
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })))
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })))
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })))
const Analytics = lazy(() => import('./pages/Analytics').then(m => ({ default: m.Analytics })))
const Reports = lazy(() => import('./pages/Reports').then(m => ({ default: m.Reports })))
const Campus = lazy(() => import('./pages/Campus'))
const About = lazy(() => import('./pages/About'))
const News = lazy(() => import('./pages/News'))

function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[#0b2545] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#0b2545] font-medium text-sm">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Chatbot />
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/senior-high" element={<SeniorHigh />} />
            <Route path="/campus/:campusId" element={<Campus />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
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
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
