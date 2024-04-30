import React, {createContext, useContext} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const theme = {
        typography: {
            fontFamily: "Antic Didone",
            fontFamilyAlt: "Hind Siliguri",
        },
        spacing: {
            xs: "8px",
            sm: "16px",
            md: "24px",
            lg: "32px",
            xl: "40px",
        },
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
        borders: {
            sm: "1px solid",
            md: "2px solid",
            lg: "3px solid",
        },
        shadows: {
            sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
            md: "0 4px 8px rgba(0, 0, 0, 0.1)",
            lg: "0 8px 16px rgba(0, 0, 0, 0.1)",
        },
        breakpoints: {
            xs: "0",
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
        },
        icons: {
            small: "16px",
            medium: "24px",
            large: "32px",
        },
        customization: {
            headerHeight: "64px",
            drawerWidth: "240px",
        },
    };
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);