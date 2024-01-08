import { Children } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";
import "./FormLayout.scss";

const FormLayout = ({ children }) => {
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/km/e/ee/Rupp_logo.png";
  const { theme } = useTheme();
  const { language } = useLanguage();
  return (
    <>
      <nav className={`navbarMiddle ${theme} ${language}`}>
        <div className="navbarMiddle-container">
          {/* Link back */}
          <div className="navbarMiddle-container-back">
            {/* <Button linkPage="/" icon={<FaArrowLeft />} /> */}
          </div>
          {/* Logo */}
          <div className="navbarMiddle-container-logo">
            <img href="/" src={imageUrl} alt="Logo" className="logo-image" />
            <p className="logo-name">Cheang</p>
          </div>
        </div>
      </nav>
      {children}
      <div className={`copyright-container ${theme}`}>
        <div className="copyright-container-content">
          <p>
            &copy; 2023 Handy. All rights reserved. Handy powered by Visal
            Brathna Sophana
          </p>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
