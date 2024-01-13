import { useTheme } from "../../context/ThemeContext";
import Label from "../label/Label";
import "./CardService.scss";
const CardService = (props) => {
  const { image, name, description, price, children } = props;
  const { theme } = useTheme();
  return (
    <div className={`service-list ${theme}`}>
      <div className="service-list-card">
        <img src={image} alt="service" />
        <div className="card-detail">
          <Label label={name} />
          <p className="descritpion">{description}</p>
          <p>${price}</p>
        </div>
      </div>
      <div className="card-action">{children}</div>
    </div>
  );
};

export default CardService;
