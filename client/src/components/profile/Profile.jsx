import { useTheme } from "../../context/ThemeContext";
import "./Profile.scss";

const Profile = ({ src, onClick }) => {
  const { theme } = useTheme();
  return (
    <img
      className={`profile ${theme}`}
      src={src} // Replace with the actual profile picture URL
      alt="Profile"
      onClick={onClick}
    />
  );
};

export default Profile;
