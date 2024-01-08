import PropTypes from "prop-types";
import "./FormField.scss";
import { useTheme } from "../../context/ThemeContext";

const FormField = ({
  type,
  name,
  step,
  value,
  onChange,
  placeholder,
  required,
}) => {
  const { theme } = useTheme();
  return (
    <div className={`formField ${theme}`}>
      <input
        className="formField-input"
        type={type}
        id={name}
        name={name}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

// FormField.propTypes = {
//   label: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
//   required: PropTypes.bool,
// };

export default FormField;
