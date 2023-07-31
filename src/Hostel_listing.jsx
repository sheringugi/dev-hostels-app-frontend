// import React, { useState, useEffect } from "react";
// import "./Hostel_listing.css";

// function HostelListing() {
//   const [hostels, setHostels] = useState([]);

//   useEffect(() => {
//     fetchHostels();
//   }, []);

//   const fetchHostels = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/hostels");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setHostels(data);
//     } catch (error) {
//       console.error("Error fetching hostels:", error);
//     }
//   };

//   return (
//     <>
//       <h1>Hostel Listing</h1>
//       <div>
//         <ul></ul>
//         <ul>
//           {hostels.map((hostel) => (
//             <li key={hostel.id}>
//               <h2>{hostel.room_type}</h2>
//               <p>Total Occupancy: {hostel.total_occupancy}</p>
//               <p>Total Bedrooms: {hostel.total_bedrooms}</p>
//               <p>Total Bathrooms: {hostel.total_bathrooms}</p>
//               <p>Total Beds: {hostel.total_beds}</p>
//               <p>Summary: {hostel.summary}</p>
//               <p>Address: {hostel.address}</p>
//               <p>Has TV: {hostel.has_tv ? "Yes" : "No"}</p>
//               <p>Has Kitchen: {hostel.has_kitchen ? "Yes" : "No"}</p>
//               <p>
//                 Has Air Conditioner: {hostel.has_air_conditioner ? "Yes" : "No"}
//               </p>
//               <p>Has Internet: {hostel.has_internet ? "Yes" : "No"}</p>
//               <p>Has Study Room: {hostel.has_study_room ? "Yes" : "No"}</p>
//               <p>Has Meals: {hostel.has_meals ? "Yes" : "No"}</p>
//               <p>Price: {hostel.price}</p>
//               <p>Published At: {hostel.published_at}</p>
//               <p>User ID: {hostel.user_id}</p>
//               <p>Latitude: {hostel.latitude}</p>
//               <p>Longitude: {hostel.longitude}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default HostelListing;
