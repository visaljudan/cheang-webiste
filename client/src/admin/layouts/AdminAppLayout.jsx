import { Children, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import {
  NavigationLink,
  NavigationLinkDisabled,
} from "../../components/navigationLink/NavigationLink";
import { getLanguage } from "../../data/wordsLanguage";
import DashboardList from "../../data/DashboardList.jsx";
import Label from "../../components/label/Label.jsx";
import "./AdminAppLayout.scss";
const AdminAppLayout = ({ name, children }) => {
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/km/e/ee/Rupp_logo.png";
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
    <>
      <div className="dashboard-container">
        <header className="dashboard-container-navbar">
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
                <img
                  href="/"
                  src={imageUrl}
                  alt="Logo"
                  className="logo-image"
                />
                <p className="logo-name">Cheang</p>
              </div>

              {/* Contorl for button */}
              <div className="authnavbar-container-control">
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
        </header>

        <div className="dashboard-container-content">
          <div className="content-sidebar">
            <ul className="content-sidebar-list">
              <Label label="Overview" />
              {DashboardList.slice(0, 4).map((list) => (
                <li key={list.id}>
                  <NavigationLink {...list} />
                </li>
              ))}
              {DashboardList.slice(4, 5).map((list) => (
                <li key={list.id}>
                  <NavigationLink {...list} />
                </li>
              ))}
              {DashboardList.slice(5, 7).map((list) => (
                <li key={list.id}>
                  <NavigationLink {...list} />
                </li>
              ))}
            </ul>
          </div>
          <div className="content-container">{children}</div>
        </div>

        <div className="copyright-container">
          <div className="copyright-container-content">
            <p>
              &copy; 2023 Handy. All rights reserved. Handy powered by Visal
              Brathna Sophana
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAppLayout;
