import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const RenderStar = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderFullStars = () => {
    return Array.from({ length: fullStars }, (_, index) => (
      <span key={index}>
        <FaStar style={{ fontSize: "1.5rem", color: "#ff7f00" }} />
      </span>
    ));
  };

  const renderHalfStar = () => {
    return (
      <span>
        <FaStarHalfAlt style={{ fontSize: "1.5rem", color: "#ff7f00" }} />
      </span>
    );
  };

  const renderEmptyStars = () => {
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return Array.from({ length: remainingStars }, (_, index) => (
      <span key={`empty-${index}`}>
        <FaRegStar style={{ fontSize: "1.5rem", color: "#ff7f00" }} />
      </span>
    ));
  };

  return (
    <div className="star-rating">
      {renderFullStars()}
      {hasHalfStar && renderHalfStar()}
      {renderEmptyStars()}
    </div>
  );
};

export default RenderStar;
