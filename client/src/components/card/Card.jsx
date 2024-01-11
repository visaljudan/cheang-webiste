import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../button/Button";
import Label from "../label/Label";
import TextBorder from "../textBorder/TextBorder";
import "./Card.scss";
const Card = (props) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const ImgBackGround =
    "https://img.freepik.com/premium-vector/abstract-pattern-background-with-futuristic-modern-style-concept_7505-2436.jpg";
  const { avatar, brandName, province, mainService, rating, LinkPage, ID } =
    props;
  return (
    <div className={`card ${theme}`}>
      <div className="card-container">
        <img className="card-image" src={ImgBackGround} alt="Cover Image" />
        <img className="card-profile" src={avatar} alt="Profile Image" />
        <div className="card-detail">
          <Label label={brandName} />
          <div className="card-detail-content">
            <TextBorder label="Type of Service" text={mainService} />
            <TextBorder label="Location" text={province} />
          </div>
          <div className="card-detail-action">
            <Link to={`/profile/${ID}`}>
              <button style={{ width: "6rem" }}>See more</button>
            </Link>
            <Label label={rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
