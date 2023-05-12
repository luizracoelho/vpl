import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFindBrand from "../../hooks/brand/use-find-brand";
import useListModels from "../../hooks/model/use-list-models";
import useListModelsByBrandId from "../../hooks/model/use-list-models-by-brand-id";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import ModelsList from "./models-list";
import SEO from "../../components/seo";

const ModelsPage = () => {
    const [modelsResult, setModelsResult] = useState<ApiResult>(ApiResult.start());
    const [brandResult, setBrandResult] = useState<ApiResult>(ApiResult.start());

    const { brandId } = useParams();
    const { state } = useLocation();

    const listModels = useListModels();
    const listModelsByBrandId = useListModelsByBrandId();
    const findBrand = useFindBrand();

    const fetchData = async () => {
        if (brandId && state)
            setModelsResult(await listModelsByBrandId(parseInt(brandId)));
        else if (brandId) {
            setBrandResult(await findBrand(parseInt(brandId)));
            setModelsResult(await listModelsByBrandId(parseInt(brandId)));
        }
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
                    <SEO title="Modelos"
                        description="Confira a relação de modelos que controlamos o valor de mercado"
                        keywords="ford, volkswagen, chevrolet, carro, preço, vender, comprar, veículo" />

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
    } else if (brandId) {
        let brandName: string = '';
        let brandLogo: string = '';

        if (modelsResult.status === ApiResultStatus.success && modelsResult.data.length > 0) {
            brandName = modelsResult.data[0].brandName;
            brandLogo = modelsResult.data[0].brandLogo;
        } else if (brandResult.status === ApiResultStatus.success) {
            brandName = brandResult.data.name;
            brandLogo = brandResult.data.logo;
        }

        return (
            <>
                <SEO title="Modelos"
                    description="Confira a relação de modelos que controlamos o valor de mercado"
                    keywords="ford, volkswagen, chevrolet, carro, preço, vender, comprar, veículo" />

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
                <SEO title="Modelos"
                    description="Confira a relação de modelos que controlamos o valor de mercado"
                    keywords="ford, volkswagen, chevrolet, carro, preço, vender, comprar, veículo" />
                    
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