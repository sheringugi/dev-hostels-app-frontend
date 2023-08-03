import React from "react";
import "./FilterByLocation.css";

function FilterByLocation({ locations, selectedLocation, onLocationClick }) {
  return (
    <div className="filter-by-location">
      <h2>Filter by Location:</h2>
      <ul>
        {locations.map((location) => (
          <li
            key={location}
            onClick={() => onLocationClick(location)}
            className={selectedLocation === location ? "selected" : ""}
          >
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterByLocation;
