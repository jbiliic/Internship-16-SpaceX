import { DarkThemeContext } from "./darkThemeContext";
import { useContext } from "react";
export const useDarkTheme = () => {
    const context = useContext(DarkThemeContext);
    if (!context) {
        throw new Error('useDarkTheme must be used within a DarkThemeProvider');
    }
    return context;
};