import Wrapper from "../Atom/Wrapper";
import Link from "../Atom/Link";
import { Link as ReactLink } from "react-router-dom";
import en from "./../Translations/en.json";
import ru from "./../Translations/ru.json";
import Button from "../Atom/Button";

const Header = ({ language, setLanguage }) => {
  const translations = language === "english" ? en : ru;
  const handleSetLanguage = () => {
    if (language === "english") {
      setLanguage("russian");
    } else {
      setLanguage("english");
    }
  };
  return (
    <header className="header">
      <nav>
        <Wrapper className="row">
          <ReactLink className="nav-item" to="/dashboard">
            {translations.buttons.dashboard}
          </ReactLink>
          <ReactLink className="nav-item" to="/">
            {translations.buttons.home}
          </ReactLink>
          <Link className="nav-item" route={"//www.google.com"}>
            {translations.buttons.google}
          </Link>
          <Button className="nav-item" onClick={() => handleSetLanguage()}>
            {language === "english"
              ? translations.buttons.russian
              : translations.buttons.english}
          </Button>
        </Wrapper>
      </nav>
    </header>
  );
};

export default Header;
