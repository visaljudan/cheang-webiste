import "./Tag.scss";
const Tag = ({ label, idLabel }) => {
  return (
    <p className="label" id={idLabel}>
      {label}
    </p>
  );
};

export default Tag;
