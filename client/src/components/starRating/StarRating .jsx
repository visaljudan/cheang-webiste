import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ userId, onChange }) => {
  const [rating, setRating] = useState(() => {
    // Initialize rating from localStorage or default to 0
    const storedRating = localStorage.getItem(`userRating_${userId}`);
    return storedRating ? parseInt(storedRating, 10) : 0;
  });

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    onChange(newRating);
  };

  useEffect(() => {
    // Save the rating to localStorage whenever it changes
    localStorage.setItem(`userRating_${userId}`, rating.toString());
  }, [rating, userId]);

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
