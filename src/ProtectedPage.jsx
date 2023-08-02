import React from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedNavBar from './ProtectedNavBar';

function ProtectedPage({ handleLogout }) {


  const handleLogoutClick = () => {
    // Perform logout logic
    // Call handleLogout when logout is successful
    handleLogout();
  };

 
  return (
    <div>
      <h3>Welcome to the Protected Page!</h3>
      <ProtectedNavBar />
        <button onClick={handleLogoutClick}>Logout</button>
      <hr />
      <Outlet /> {/* Renders the nested child routes */}
    </div>
  );
}

export default ProtectedPage;
