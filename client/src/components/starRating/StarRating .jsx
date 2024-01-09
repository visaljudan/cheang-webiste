import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          onClick={() => handleStarClick(index)}
          color={index < rating ? "#ffc107" : "#e4e5e9"}
          size={30}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
