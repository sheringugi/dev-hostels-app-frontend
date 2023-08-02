// Parent component
import React, { useState } from "react";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <BrowserRouter>
      <AppRoutes isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
