import { createContext, useEffect, useState, type ReactNode } from "react";

interface DarkThemeContextType {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

export const DarkThemeContext = createContext<DarkThemeContextType | undefined>(undefined);

export const DarkThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('isDarkTheme');
        if (storedTheme) {
            setIsDarkTheme(storedTheme === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isDarkTheme', String(isDarkTheme));
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    const toggleDarkTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    return (
        <DarkThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
            {children}
        </DarkThemeContext.Provider>
    );      
};