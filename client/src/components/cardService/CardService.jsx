import { useTheme } from "../../context/ThemeContext";
import "./CardService.scss";
const CardService = (props) => {
  const { avatar, name, descritpion, price, children } = props;
  const { theme } = useTheme();
  return (
    <div className={`service-list ${theme}`}>
      <div className="service-list-card">
        <img src={image} alt="service" />
        <div className="card-detail">
          <p>{name}</p>
          <p className="descritpion">{descritpion}</p>
          <p>{price}</p>
        </div>
      </div>
      <div className="card-action">{children}</div>
    </div>
  );
};

export default CardServices;
