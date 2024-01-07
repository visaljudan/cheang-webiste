import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
export function NavigationLink(props) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { href, value, style, disabled } = props;
  return (
    <a
      href={href}
      className={`navigationLink ${theme} ${language}`}
      style={style}
      disabled={disabled}
    >
      {value}
    </a>
  );
}

export function NavigationLinkDisabled({ nameLink }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  return (
    <a className={`navigationLinkDisabled ${theme} ${language}`} disabled>
      {nameLink}
    </a>
  );
}
