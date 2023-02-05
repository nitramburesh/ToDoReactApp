import { useState, useEffect } from "react";
import Wrapper from "../Atom/Wrapper";
import en from "./../Translations/en.json";
import ru from "./../Translations/ru.json";

const Dashboard = ({ language }) => {
  const [time, setTime] = useState();
  const [appWidth, setAppWidth] = useState(window.innerWidth);
  const translations = language === "english" ? en : ru;
  useEffect(() => {
    const handleResize = () => {
      setAppWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setTime(new Date());
    const intervalId = setInterval(() => setTime(new Date()), 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const Time = () => {
    const padLeft = (number) => {
      return number?.toString().padStart(2, "0");
    };
    const hours = padLeft(time?.getHours());
    const minutes = padLeft(time?.getMinutes());
    if (time) {
      return (
        <Wrapper className="row">
          <h1 className="dashboard-item">{translations.text.currentTime}</h1>
          <h1 className="dashboard-item">{hours + ":" + minutes}</h1>
        </Wrapper>
      );
    }
  };
  const AppWidth = () => {
    return (
      <Wrapper className="row">
        <h1 className="dashboard-item">{translations.text.currentAppWidth}</h1>
        <h1 className="dashboard-item">{`${appWidth}px`}</h1>
      </Wrapper>
    );
  };
  return (
    <Wrapper className="wrap-center">
      <Wrapper className="dashboard">
        <Time />
        <AppWidth />
      </Wrapper>
    </Wrapper>
  );
};

export default Dashboard;
