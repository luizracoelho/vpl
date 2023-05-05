import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import AppRouter from "./app-router";
import useThemeMode from "./hooks/theme-mode/use-theme-mode";

const App = () => {

    const components = {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '2rem',
                }
            }
        },
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
        components: components
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        },
        components: components
    });

    const themeMode = useThemeMode();
    const theme = themeMode === 'dark' ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    );
};

export default App;