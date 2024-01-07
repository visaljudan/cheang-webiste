import { useTheme } from "../../context/ThemeContext";
import "./Label.scss";

const Label = ({ label, idLabel }) => {
  const { theme } = useTheme();
  return (
    <>
      <h2 className={`label-title ${theme}`} id={idLabel}>
        {label}
      </h2>
    </>
  );
};
export default Label;
