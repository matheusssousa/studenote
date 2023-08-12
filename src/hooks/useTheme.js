import { useContext, createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") !== "dark" ? "light" : "dark"
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [])

    return (
        <ThemeContextProvider value={{ theme, setTheme }}>
            {children}
        </ThemeContextProvider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}