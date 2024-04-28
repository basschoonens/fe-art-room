import React, {createContext, useContext} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const theme = {
        typography: {},
        spacing: {},
        colors: {
            primary: "#ECD5BB",
            secondary: "#54627B",
            // success: "#28a745",
            // info: "#17a2b8",
            // warning: "#ffc107",
            // danger: "#dc3545",
            light: "#C4DBE0",
            dark: "#710117",
            white: "#ffffff",
            transparent: "transparent",
            black: "#000000",
        },
        borders: {},
        shadows: {},
        breakpoints: {},
        icons: {},
        customization: {},
    };
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);