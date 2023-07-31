import HostelListing from "./Hostel_listing";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <>
      {/* <h1>Hostels</h1> */} <br />
      <br />
      <Signup />
      <br /> 
      <HostelListing />
      <Login />
      <br />
    </>
  );
}

export default App;
