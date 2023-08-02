import React from "react";
import "./FilterByRoom.css";

const FilterByRoom = ({ roomTypes, selectedRoomType, onRoomClick }) => {
  return (
    <div className="filter-buttons">
      {roomTypes.map((roomType) => (
        <button
          key={roomType}
          className={`filter-button ${selectedRoomType === roomType ? "active" : ""}`}
          onClick={() => onRoomClick(roomType)}
        >
          {roomType === "all" ? "All Rooms" : roomType.replace("-", " ").toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default FilterByRoom;