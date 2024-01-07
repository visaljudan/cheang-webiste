import "./FormField.scss";

const FormField = ({
  type,
  name,
  step,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
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
  );
};

export default FormField;
