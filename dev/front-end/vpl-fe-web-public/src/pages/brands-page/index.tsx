import { Box, Typography } from "@mui/material";
import { Brand } from "../../models/brand";
import BrandCard from "./brand-card";

const BrandsPage = () => {

    const brand = new Brand();

    brand.id = 0;
    brand.name = 'Genérica';

    return (
        <>
            <Typography variant="h1" component="h1">Marcas</Typography>
            <Typography variant="h6" component="p">
                Encontre a marca do seu novo veículo,
                <br />
                clique sobre ela para ver todos os modelos disponíveis.
            </Typography>

            <Box sx={{ mt: 3 }}>
                <BrandCard {...brand} />
            </Box>
        </>
    );
};

export default BrandsPage;