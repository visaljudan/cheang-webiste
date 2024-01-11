import { useTheme } from "../../context/ThemeContext";
import "./TextBorder.scss";

const TextBorder = ({ label, text }) => {
  const { theme } = useTheme();
  return (
    <div className={`TextBorder ${theme}`}>
      <div className="TextBorder-container">
        <p className="TextBorder-container-label">{label}</p>
        <p className="TextBorder-container-text">{text}</p>
      </div>
    </div>
  );
};

export default TextBorder;
