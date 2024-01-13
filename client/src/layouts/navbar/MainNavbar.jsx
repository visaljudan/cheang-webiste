import { layouts } from "chart.js";
import Logo from "../../assets/logo.png";
import {
  NavigationLink,
  NavigationLinkDisabled,
} from "../../components/navigationLink/NavigationLink";
import {
  getAbout,
  getBecomePro,
  getHome,
  getLanguage,
  getService,
  getSignup,
} from "../../data/wordsLanguage";
import { useLanguage } from "../../context/LanguageContext";
import ServiceList from "../../data/ServiceList";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import "./MainNavbar.scss";
import { Link, useParams } from "react-router-dom";
import Profile from "../../components/profile/Profile";
import { useSelector } from "react-redux";

const MainNavbar = ({ page }) => {
  //User
  const { currentUser } = useSelector((state) => state.user);
  //Theme and Language
  const { theme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  //Show menu
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {}, [currentUser]);

  //Link Page
  const pageLink = page;

  return (
    <nav className={`navbar ${theme}`}>
      <div className={showMenu ? "navbar-container-menu" : "navbar-container"}>
        <button className="toggle-btn" onClick={toggleMenu}>
          &#9776;
        </button>

        {/* Logo */}
        <div className="navbar-container-logo">
          <img href="/" src={Logo} alt="Logo" className="logo-image" />
          <a href="/" className="logo-image-link"></a>
          <p className="logo-name">Cheang</p>
        </div>

        {/* Link */}
        <div className="navbar-container-links">
          {pageLink === "home" ? (
            <NavigationLinkDisabled value={getHome(language)} />
          ) : (
            <NavigationLink href="/" value={getHome(language)} />
          )}

          <div className="link-dropdown">
            {pageLink === "service" ? (
              <NavigationLinkDisabled value={getService(language)} />
            ) : (
              <NavigationLink href="/service" value={getService(language)} />
            )}

            <div className="link-dropdown-content">
              {ServiceList.map((serivce) => (
                <NavigationLink
                  // href={`/service-list/${serivce.nameLink.toLowerCase()}`}
                  value={serivce.value}
                  key={serivce.id}
                />
              ))}
            </div>
          </div>

          {pageLink === "about" ? (
            <NavigationLinkDisabled value={getAbout(language)} />
          ) : (
            <NavigationLink value={getAbout(language)} href="/about" />
          )}
        </div>

        {/* Contorl for button */}
        <div className="navbar-container-control">
          <ThemeSelector />
          <span className="control-label-langue">
            {getLanguage(language)} :
          </span>
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        {/* Account */}
        <div className="navbar-container-account">
          {currentUser ? (
            <>
              {currentUser.userPro ? (
                <>
                  <h3>{currentUser.uerPro}</h3>
                  <Link to="/profile">
                    <Profile src={currentUser.avatar} />
                  </Link>
                </>
              ) : (
                <>
                  <h3>{currentUser.uerPro}</h3>
                  <NavigationLink
                    href="/signup-pro"
                    value={getBecomePro(language)}
                  />
                  <Link to="/profile">
                    <Profile src={currentUser.avatar} />
                  </Link>
                </>
              )}
            </>
          ) : (
            <NavigationLink href="/signup" value={getSignup(language)} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
