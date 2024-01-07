import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWordpress,
  FaTiktok,
} from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  return (
    <>
      <div className={`footer-container ${theme} `}>
        <div className="column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Guidelines</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="column">
          <h3>Filter</h3>
          <ul>
            <li>
              <a href="/filter-location">Location</a>
            </li>
            {/* Add more filter options as needed */}
          </ul>
        </div>

        <div className="column">
          <h3>Popular Services</h3>
          <ul>
            <li>
              <a href="/popular-service-1">Popular Service 1</a>
            </li>
            <li>
              <a href="/popular-service-2">Popular Service 2</a>
            </li>
            <li>
              <a href="/popular-service-3">Popular Service 3</a>
            </li>
          </ul>
        </div>
        <div className="social-icons">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWordpress />
          </a>
        </div>
      </div>
      <div className={`mixpanel-container ${theme}`}>
        <div className="mixpanel-container-divider"></div>
        <ul>
          <li>
            <a href="/privacy">Privacy</a>
          </li>
          {/* <li>
          <a href="/pre-collection-notice">CA Pre-Collection Notice</a>
        </li> */}
          <li>
            <a href="/do-not-sell">
              Do Not Sell or Share My Personal Information
            </a>
          </li>
          <li>
            <a href="/cookies">Cookies</a>
          </li>
          <li>
            <a href="/terms">Terms</a>
          </li>
          <li>
            <a href="/cancellation-policy">Cancellation Policy</a>
          </li>
          <li>
            <a href="/accessibility">Accessibility Tools</a>
          </li>
        </ul>
      </div>
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

export default Footer;
