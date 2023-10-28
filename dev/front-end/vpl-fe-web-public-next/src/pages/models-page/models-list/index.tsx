import { Grid } from "@mui/material";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import { Model } from "../../../models/model";
import ModelCard from "../model-card";

export interface ModelsListProps {
    modelsResult: ApiResult;
}

const ModelsList = ({ modelsResult }: ModelsListProps) => {
    return (
        <>
            {modelsResult?.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {modelsResult?.status === ApiResultStatus.error && <p>Erro: {modelsResult.errorMessage}</p>}

            {modelsResult?.status === ApiResultStatus.success && modelsResult.data.length > 0 &&
                <Grid container spacing={1} sx={{ my: 3 }}>
                    {modelsResult.data.map((model: Model) => (
                        <Grid item key={model.id} xs={12} lg={6}>
                            <ModelCard {...model} />
                        </Grid>
                    ))}
                </Grid>
            }

            {modelsResult?.status === ApiResultStatus.success && modelsResult.data.length === 0 &&
                <p>:( Nenhum Registro Encontrado</p>
            }
        </>
    );
};

export default ModelsList;