import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import {
  NavigationLink,
  NavigationLinkDisabled,
} from "../../components/navigationLink/NavigationLink";
const AdminAppLayout = ({ name }) => {
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/km/e/ee/Rupp_logo.png";
  const { theme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const nameLinked = name;
  return (
    <div>
      <nav className="authnavbar">
        <div
          className={
            showMenu ? "authnavbar-container-menu" : "authnavbar-container"
          }
        >
          <button className="toggle-btn" onClick={toggleMenu}>
            &#9776;
          </button>

          {/* Logo */}
          <div className="authnavbar-container-logo">
            <img href="/" src={imageUrl} alt="Logo" className="logo-image" />
            <p href="/" className="logo-image-lick"></p>
            <p className="logo-name">Cheang</p>
          </div>

          {/* Contorl for button */}
          <div className="authnavbar-container-control">
            <ThemeSelector />
            <span className="control-label-langue">
              {getLanguage(language)} :
            </span>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </nav>
      <div className="content-sidebar">
        <ul className="content-sidebar-list">
          <SubLabel sublabel="Menu" />
          {DashboardList.slice(0, 4).map((list) => (
            <li key={list.id}>
              <NavigationLink {...list} />
            </li>
          ))}
          <SubLabel sublabel="Support" />
          {DashboardList.slice(4, 5).map((list) => (
            <li key={list.id}>
              <NavigationLink {...list} />
            </li>
          ))}
          <SubLabel sublabel="Other" />
          {DashboardList.slice(5, 7).map((list) => (
            <li key={list.id}>
              <NavigationLink {...list} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAppLayout;
