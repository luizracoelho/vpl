import { Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

const ModelsPage = () => {
    const { brandId } = useParams();
    const { state } = useLocation();
    const { brandName, brandLogo } = state;

    return (
        <>
            <Typography variant="h1" component="h1">Modelos</Typography>
            <Typography variant="h6" component="p">
                Encontre o modelo do seu novo veículo da marca <strong>{brandName}</strong>,
                <br />
                clique sobre ele para ver todos os veículo disponíveis.
            </Typography>
        </>
    )
}

export default ModelsPage;