import { Typography } from "@mui/material";
import useListMenu from "hooks/menu/use-list-menu";
import HomeCard from "./home-card";

const HomePage = () => {
    const menus = useListMenu();

    return (
        <>
            <Typography variant="h5" component="h1">Home</Typography>

            <Typography component="p">Consulte todas as marcas, modelos, veículos e seu histórico de valor de mercado através do app VPL.</Typography>

            {menus.map((menu) => (
                <HomeCard key={menu.route.toString()} {...menu} />
            ))}
        </>
    );
}

export default HomePage;