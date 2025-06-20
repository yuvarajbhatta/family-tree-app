import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AddPersonPage from './pages/AddPersonPage';
import RelationshipPage from './pages/RelationshipPage';
import DashboardPage from './pages/DashboardPage';
import PeoplePage from './pages/PeoplePage';
import RemovePersonPage from './pages/RemovePersonPage';
import UserStatus from './pages/UserStatus'; 

function App() {
  return (
    <Router>
      <UserStatus />
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/add-person" element={<AddPersonPage />} />
        <Route path="/relationship" element={<RelationshipPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/remove-person" element={<RemovePersonPage />} />
      </Routes>
    </Router>
  );
}

export default App;