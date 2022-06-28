import { createContext, useState, useEffect } from "react";

const themes = {
    dark: {
        backgroundColor: "black",
        color: "#FFFFFF",
        headerBgColor: "#000000",
        footerBgColor: "#000000",
        tabIconsBgColor: "#FFFFFF",
        tabIcons: "#000000",
        shadowTopColor: "rgba(255, 255, 255, 255) 0px -2px 10px",
        shadowBottomColor: "rgba(255, 255, 255, 255) 0px 2px 10px",
        footerSocialIconcolor: '#FFFFFF',
        footerCopyrighttext: '#61DBFB',
        cardColor: '#343a40'
    },
    light: {
        backgroundColor: "#eceef4",
        color: "#000000",
        headerBgColor: "#FFFFFF",
        footerBgColor: "#FFFFFF",
        tabIconsBgColor: "#000000",
        tabIcons: "#FFFFFF",
        shadowTopColor: "rgba(0, 0, 0, 0.35) 0px -5px 15px",
        shadowBottomColor: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        footerSocialIconcolor: '#000000',
        footerCopyrighttext: '#000000',
        cardColor: '#FFFFFF'
    },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [isDark,setIsDark] = useState(false);
    const theme = isDark ? themes.dark : themes.light;
    const toggleTheme = () => {
        localStorage.setItem('isDark', JSON.stringify(!isDark));
        setIsDark(!isDark);
    };

    useEffect(() => {
        const isDark = localStorage.getItem('isDark') === "true";
        setIsDark(isDark);
    }, []);

    return (
        <ThemeContext.Provider value={[{ theme, isDark}, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    );
};