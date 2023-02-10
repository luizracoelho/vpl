import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Tooltip, Typography } from "@mui/material";
import { To, useNavigate } from "react-router-dom";
import useListMenuAll from "../../hooks/menu/use-list-menu-all";
import useSetThemeMode from "../../hooks/theme-mode/use-set-theme-mode";
import useThemeMode from "../../hooks/theme-mode/use-theme-mode";

const Header = () => {
    const themeMode = useThemeMode();
    const setThemeMode = useSetThemeMode();
    const menus = useListMenuAll();
    const navigate = useNavigate();

    const goTo = (route: To) => {
        navigate(route);
    }

    return (
        <AppBar component="header">
            <Toolbar component="nav">
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    VPL
                </Typography>
                <Box>
                    <Tooltip title={themeMode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>
                        <Button sx={{ color: '#fff' }} onClick={setThemeMode}>
                            {themeMode === 'dark' && <LightMode />}
                            {themeMode === 'light' && <DarkMode />}
                        </Button>
                    </Tooltip>

                    {menus.map((menu) => (
                        <Button key={menu.route.toString()} sx={{ color: '#fff' }} onClick={() => goTo(menu.route)}>{menu.text}</Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;