import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import "./NavigationLink.scss";
export function NavigationLink(props) {
  const { theme } = useTheme();
  const { href, value } = props;
  return (
    <a className={`navigationLink ${theme}`} href={href}>
      {value}
    </a>
  );
}

export function NavigationLinkDisabled({ value }) {
  const { theme } = useTheme();
  return (
    <a className={`navigationLinkDisabled ${theme}`} disabled>
      {value}
    </a>
  );
}
