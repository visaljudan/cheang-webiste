import { layouts } from "chart.js";
import Logo from "../../assets/logo.png";
import { NavigationLink } from "../../components/navigationLink/NavigationLink";
import {
  getHome,
  getLanguage,
  getService,
  getSignup,
} from "../../data/wordsLanguage";
import { useLanguage } from "../../context/LanguageContext";
import ServiceList from "../../data/ServiceList";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import { useSelector } from "react-redux";

const MainNavbar = ({ page }) => {
  //User
  const { currentUser } = useSelector((state) => state.user);

  //
  const pageLink = { page };
  const { language, changeLanguage } = useLanguage();
  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="navbar-container">
      {/* Logo */}
      <div className="navbar-container-logo">
        <img href="/" src={Logo} alt="Logo" className="logo-image" />
        <a href="/" className="logo-image-link"></a>
        <p className="logo-name">Cheang</p>
      </div>

      {/* Link */}
      <div className="navbar-container-links">
        {pageLink === "/" ? (
          <NavigationLink value={getHome(language)} disabled />
        ) : (
          <NavigationLink value="Home" />
        )}

        <div className="link-dropdown">
          {pageLink === "service" ? (
            <NavigationLink value={getService(language)} disabled />
          ) : (
            <NavigationLink
              href="#service_section"
              value={getService(language)}
            />
          )}

          <div className="link-dropdown-content">
            {ServiceList.map((serivce) => (
              <NavigationLink
                // href={`/service-list/${serivce.nameLink.toLowerCase()}`}
                vaue={serivce.nameLink}
                key={serivce.id}
              />
            ))}
          </div>
        </div>

        {pageLink === "about" ? (
          <NavigationLink value="About" disabled />
        ) : (
          <NavigationLink value="About" href="singin" />
        )}
      </div>

      {/* Contorl for button */}
      <div className="navbar-container-control">
        <ThemeSelector />
        <span className="control-label-langue">{getLanguage(language)} :</span>
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
              <Link to="/profile">
                <Profile src={currentUser.avatar} />
              </Link>
            ) : (
              <>
                <NavigationLink href="/userpro" value="Become Pro" />
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
  );
};

export default MainNavbar;
