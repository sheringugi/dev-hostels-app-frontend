import { BrowserRouter } from 'react-router-dom';
import React from "react";
// import Navbar from "./Unprotected_Navbar";
import AppRoutes from "./AppRoutes";
// import { UserProvider } from './UserContext';

function App() {
  return (
    <>
    <UserProvider>
      <BrowserRouter>
    {/* <Navbar /> */}
    <AppRoutes />
  </BrowserRouter>
  </UserProvider>
    </>
  );
}

export default App;
