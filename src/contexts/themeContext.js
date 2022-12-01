import { createContext, useState, useEffect } from "react";

const themes = {
  dark: {
    backgroundColor: "black",
    color: "#FFFFFF",
    reactlogoColor: "#61DBFB",
    headerBgColor: "#000000",
    footerBgColor: "#000000",
    tabIconsBgColor: "#FFFFFF",
    tabIcons: "#000000",
    shadowTopColor: "rgba(255, 255, 255, 255) 0px -2px 10px",
    shadowBottomColor: "rgba(255, 255, 255, 255) 0px 2px 10px",
    footerSocialIconcolor: "#FFFFFF",
    footerCopyrighttext: "#61DBFB",
    cardColor: "#343a40",
    cardLeftBorderColor: "#343a40",
    buttonColor: "light",
    cardShadow: "0px 2px 15px rgba(255, 255, 255, 0.6)",
    inputFieldColor: "#000000",
    inputTextColor: "#FFFFFF",
    inputIcon: "#FFFFFF",
    inputPrependColor: "#000000",
    inputfieldShadow: "0px 2px 15px rgba(255, 255, 255, 0.6)",
  },
  light: {
    backgroundColor: "#eceef4",
    color: "#000000",
    reactlogoColor: "#61DBFB",
    headerBgColor: "#FFFFFF",
    footerBgColor: "#FFFFFF",
    tabIconsBgColor: "#000000",
    tabIcons: "#FFFFFF",
    shadowTopColor: "rgba(0, 0, 0, 0.35) 0px -5px 15px",
    shadowBottomColor: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    footerSocialIconcolor: "#000000",
    footerCopyrighttext: "#000000",
    cardColor: "#FFFFFF",
    cardLeftBorderColor: "rgb(245 255 250)",
    buttonColor: "dark",
    cardShadow: "0px 3px 8px #00000029",
    inputFieldColor: "#FFFFFF",
    inputTextColor: "#000000",
    inputIcon: "#000000",
    inputPrependColor: "#DEDEDE",
    inputfieldShadow: "0px 3px 8px #00000029",
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  useEffect(() => {
    const isDark = localStorage.getItem("isDark") === "true";
    setIsDark(isDark);
  }, []);

  return (
    <ThemeContext.Provider value={[{ theme, isDark }, setIsDark, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
