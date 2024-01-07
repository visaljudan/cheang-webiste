// src/components/common/ThemeSelector.jsx
import { useTheme } from "../../context/ThemeContext";
import "./ThemeSelector.scss";

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switch">
      <label className="switch-mode">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => toggleTheme()}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeSelector;
