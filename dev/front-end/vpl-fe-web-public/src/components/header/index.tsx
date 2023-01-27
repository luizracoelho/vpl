import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import useListMenuAll from "hooks/menu/use-list-menu-all";
import { To, useNavigate } from "react-router-dom";

const Header = () => {
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
                    {menus.map((menu) => (
                        <Button key={menu.route.toString()} sx={{ color: '#fff' }} onClick={() => goTo(menu.route)}>{menu.text}</Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;