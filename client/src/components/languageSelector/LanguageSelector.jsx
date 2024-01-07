import "./LanguageSelector.scss";
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "kh", name: "ភាសាខ្មែរ" },
    { code: "zh", name: "中文 (简体)" },
  ];

  return (
    <div className="language-selector">
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option className="options" key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
