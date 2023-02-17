import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useListModels from "../../hooks/model/use-list-models";
import useListModelsByBrandId from "../../hooks/model/use-list-models-by-brand-id";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import { Model } from "../../models/model";
import ModelCard from "./model-card";
import ModelsList from "./models-list";

const ModelsPage = () => {
    const [modelsResult, setModelsResult] = useState<ApiResult>(ApiResult.start());

    const { brandId } = useParams();
    const { state } = useLocation();

    const listModels = useListModels();
    const listModelsByBrandId = useListModelsByBrandId();

    const fetchData = async () => {
        if (brandId)
            setModelsResult(await listModelsByBrandId(parseInt(brandId)));
        else
            setModelsResult(await listModels());
    };

    useEffect(() => {
        if (modelsResult.status === ApiResultStatus.loading)
            fetchData();
    });

    if (state) {
        const { brandName, brandLogo } = state;

        return (
            <>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    mb: 5
                }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h1" component="h1">Modelos</Typography>
                        <Typography variant="h6" component="p">
                            Encontre o modelo do seu novo veículo da marca <strong>{brandName}</strong>,
                            <br />
                            clique sobre ele para ver todos os veículo disponíveis.
                        </Typography>
                    </Box>
                    <Avatar
                        src={brandLogo}
                        alt={brandName}
                        sx={{
                            width: 120,
                            height: 120
                        }}>
                        <Typography variant="h4">{brandName[0]}</Typography>
                    </Avatar>
                </Box>

               <ModelsList modelsResult={modelsResult} />

            </>
        )
    } else {
        return (
            <>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h1" component="h1">Modelos</Typography>
                    <Typography variant="h6" component="p">
                        Encontre o modelo do seu novo veículo,
                        <br />
                        clique sobre ele para ver todos os veículo disponíveis.
                    </Typography>
                </Box>

                <ModelsList modelsResult={modelsResult} />

            </>
        )
    }
}

export default ModelsPage;