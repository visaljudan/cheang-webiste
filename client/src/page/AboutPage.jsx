import AppLayout from "../layouts/AppLayout";
import { useLanguage } from "../context/LanguageContext";
import { getAbout, getAboutText } from "../data/wordsLanguage";
import Label from "../components/label/Label";

const AboutPage = () => {
  const { language } = useLanguage();
  return (
    <AppLayout>
      <div>
        <Label label={getAbout(language)} />
        {getAboutText(language)}

      </div>
    </AppLayout>
  );
};

export default AboutPage;
