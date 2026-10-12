import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import CustomerDashboard from './pages/customer/CustomerDashboard';
import TurfDetails from './pages/customer/TurfDetails';
import BookingHistory from './pages/customer/BookingHistory';

import OwnerDashboard from './pages/owner/OwnerDashboard';
import AddTurf from './pages/owner/AddTurf';
import MyTurfs from './pages/owner/MyTurfs';
import EditTurf from './pages/owner/EditTurf';
import BookingRequests from './pages/owner/BookingRequests';

const bgImageUrl = `${process.env.PUBLIC_URL}/turf-sunset.jpg`;

function App() {
  return (
    <BrowserRouter>
  <AuthProvider>
    <div className="site-background" style={{ backgroundImage: `url(${bgImageUrl})` }}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/customer/dashboard"
            element={
              <PrivateRoute allowedRole="CUSTOMER">
                <CustomerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/turf/:id"
            element={
              <PrivateRoute allowedRole="CUSTOMER">
                <TurfDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/bookings"
            element={
              <PrivateRoute allowedRole="CUSTOMER">
                <BookingHistory />
              </PrivateRoute>
            }
          />

          <Route
            path="/owner/dashboard"
            element={
              <PrivateRoute allowedRole="TURF_OWNER">
                <OwnerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/owner/add-turf"
            element={
              <PrivateRoute allowedRole="TURF_OWNER">
                <AddTurf />
              </PrivateRoute>
            }
          />

          <Route
  path="/owner/edit-turf/:id"
  element={
    <PrivateRoute allowedRole="TURF_OWNER">
      <EditTurf />
    </PrivateRoute>
  }
/>



          <Route
            path="/owner/my-turfs"
            element={
              <PrivateRoute allowedRole="TURF_OWNER">
                <MyTurfs />
              </PrivateRoute>
            }
          />
          <Route
            path="/owner/booking-requests"
            element={
              <PrivateRoute allowedRole="TURF_OWNER">
                <BookingRequests />
              </PrivateRoute>
            }
          />
        </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;