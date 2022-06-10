import { createContext, useState, useEffect } from "react";

const themes = {
    dark: {
        backgroundColor: "black",
        headerBgColor: "black",
        color: "#FFFFFF",
        shadowColor: "rgba(255, 255, 255, 255) 0px 2px 10px"
    },
    light: {
        backgroundColor: "#FFFFFF",
        headerBgColor: "#FFFFFF",
        color: "#000000",
        shadowColor: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
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