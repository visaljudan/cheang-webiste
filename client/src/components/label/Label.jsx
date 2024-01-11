import { useTheme } from "../../context/ThemeContext";
import "./Label.scss";

const Label = ({ label, idLabel, style }) => {
  const { theme } = useTheme();
  return (
    <>
      <h2 className={`label-title ${theme}`} style={style} id={idLabel}>
        {label}
      </h2>
    </>
  );
};
export default Label;
