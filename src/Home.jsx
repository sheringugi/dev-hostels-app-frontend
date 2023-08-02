// import React from "react";

// function Home() {
//     return(
//         <h1>Home</h1>
//     )
// }
// export default Home;
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProtectedNavBar from "./ProtectedNavBar";
import HostelListing from "./Hostel_listing";
// import ProtectedPage from "./ProtectedPage";
function Home() {
  const location = useLocation();
  return (
    <div>
      <ProtectedNavBar className="Dashboard" />
      <div className="dashboard-content">
        {location.pathname === "/protected" && (
          <>
            <div className="dashboard-container">
             < HostelListing />
             
              
            </div>
            {/* Additional content specific to the Dashboard */}
          </>
        )}
        <Outlet /> {/* Renders the nested child routes */}
      </div>
    </div>
  );
}
export default Home;
