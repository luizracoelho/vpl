import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useListMenu from "hooks/menu/use-list-menu";
import HomeCard from "./home-card";

const HomePage = () => {
    const menus = useListMenu();

    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <img
                    src="https://img.freepik.com/free-photo/headlights-hood-black-luxury-car_146671-19730.jpg?w=2000&t=st=1675429365~exp=1675429965~hmac=1d04f800a883d9fd6bb211ea2cb5ae04c820ba5624751e1d915f8705bb1be092"
                    alt="Banner principal com um carro"
                    style={{
                        width: '100%',
                        height: '500px',
                        objectFit: 'cover',
                        position: 'absolute',
                        zIndex: -1
                    }} />

                <Box sx={{
                    px: 3,
                    mb: 3,
                    width: '100%',
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography variant="h1" component="h1" color="white" sx={{ textShadow: '1px 1px 4px black' }}>Home</Typography>
                    <Typography variant="h5" component="p" color="white" sx={{ textShadow: '1px 1px 4px black', textAlign: 'center' }}>Consulte todas as marcas, modelos, veículos e seu histórico de valor de mercado através do app VPL.</Typography>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {menus.map((menu) => (
                    <Grid item key={menu.route.toString()} xs={12} sm={6} md={4}>
                        <HomeCard {...menu} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default HomePage;