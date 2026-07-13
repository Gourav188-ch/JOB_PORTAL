import React from 'react'

// import Navbar from "./components/components_lite/Navbar"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/components_lite/Home'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy'
// import TermsOfService from './components/components_lite/TermsofService.jsx'
import Jobs from './components/components_lite/Jobs'
import Browse from './components/components_lite/Browse'
import Profile from './components/components_lite/Profile'
import Description from './components/components_lite/Description'
import Companies from './components/admincomponents/Companies'
import CompanyCreate from './components/admincomponents/CompanyCreate'
import CompanySetup from './components/admincomponents/CompanySetup'
import AdminJobs from './components/admincomponents/AdminJobs'
import PostJob from './components/admincomponents/PostJob'
import Applicants from './components/admincomponents/Applicants'
import ProtectedRoute from './components/admincomponents/ProtectedRoute'
import EditJob from './components/admincomponents/EditJob'
import Dashboard from './components/admincomponents/Dashboard'
import TermsOfService from './components/components_lite/TermOfService'
// import TermsOfService from './components/components_lite/Temp'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/description/:id",
    element: <Description />
  },
  {
    path: "/Profile",
    element: <Profile />
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />
  },
  {
    path: "/TermsOfService",
    element: <TermsOfService />
  },
  {
    path: "/Jobs",
    element: <Jobs />
  },
  {
    path: "/Home",
    element: <Home />
  },
  {
    path: "/Browse",
    element: <Browse />
  },
  // Admin Routes
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        {" "}
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        {" "}
        <PostJob />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/edit/:id",
    element: (
      <ProtectedRoute>
        <EditJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },


])

export default function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}
