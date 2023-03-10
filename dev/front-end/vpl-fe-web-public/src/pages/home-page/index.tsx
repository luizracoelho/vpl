import { Search } from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useGlobalSearchResult from "../../hooks/global-search-result/use-global-search-result";
import useSetGlobalSearchResult from "../../hooks/global-search-result/use-set-global-search-result";
import useListMenu from "../../hooks/menu/use-list-menu";
import useGlobalSearch from "../../hooks/search/use-global-search";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import { Brand } from "../../models/brand";
import { GlobalSearchTerms } from "../../models/global-search-terms";
import { Model } from "../../models/model";
import { Vehicle } from "../../models/vehicle";
import BrandCard from "../brands-page/brand-card";
import ModelCard from "../models-page/model-card";
import VehicleCard from "../vehicles-page/Vehicle-card";
import HomeCard from "./home-card";

const HomePage = () => {
    const menus = useListMenu();
    const globalSearch = useGlobalSearch();
    const setGlobalSearchResult = useSetGlobalSearchResult();
    const { globalSearchTerms, globalSearchResult } = useGlobalSearchResult();
    const { register, handleSubmit, formState: { errors } } = useForm<GlobalSearchTerms>({
        defaultValues: {
            terms: globalSearchTerms.terms
        }
    });

    const search: SubmitHandler<GlobalSearchTerms> = async (globalSearchTerms) => {
        setGlobalSearchResult(globalSearchTerms, ApiResult.start());
        setGlobalSearchResult(globalSearchTerms, await globalSearch(globalSearchTerms.terms));
    };

    return (
        <>
            {/* Banner principal */}
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
                    <Typography variant="h5" component="p" color="white" sx={{ textShadow: '1px 1px 4px black', textAlign: 'center' }}>Consulte todas as marcas, modelos, ve??culos e seu hist??rico de valor de mercado atrav??s do app VPL.</Typography>
                </Box>
            </Box>

            {/* Pesquisa */}
            <Typography variant="h4" component="h2" sx={{ mb: 3, mt: 10, textAlign: 'center' }}>Pesquise uma marca, modelo ou ve??culo:</Typography>
            <Box component="form" onSubmit={handleSubmit(search)} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TextField
                    {...register('terms', { required: 'Este campo ?? obrigat??rio', minLength: { value: 3, message: 'Sua pesquisa deve possuir ao menos 3 caracteres' } })}
                    type="search"
                    label="Digite sua pesquisa..."
                    helperText={errors.terms?.message}
                    error={!!errors.terms}
                    fullWidth
                    InputProps={{
                        endAdornment:
                            <IconButton type="submit" edge="end">
                                <Search />
                            </IconButton>
                    }}
                />

            </Box>

            {globalSearchResult.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {globalSearchResult.status === ApiResultStatus.error && <p>Erro: {globalSearchResult.errorMessage}</p>}

            {globalSearchResult.status === ApiResultStatus.success && globalSearchResult.data.brands?.length > 0 &&
                <>
                    <Typography variant="h5" component="h3" sx={{ my: 3, textAlign: 'center' }}>Marcas encontradas:</Typography>

                    <Grid container spacing={1} sx={{ my: 3 }}>
                        {globalSearchResult.data.brands.map((brand: Brand) => (
                            <Grid item key={brand.id} xs={12} lg={6}>
                                <BrandCard {...brand} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }

            {globalSearchResult.status === ApiResultStatus.success && globalSearchResult.data.models?.length > 0 &&
                <>
                    <Typography variant="h5" component="h3" sx={{ my: 3, textAlign: 'center' }}>Modelos encontrados:</Typography>

                    <Grid container spacing={1} sx={{ my: 3 }}>
                        {globalSearchResult.data.models.map((model: Model) => (
                            <Grid item key={model.id} xs={12} lg={6}>
                                <ModelCard {...model} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }

            {globalSearchResult.status === ApiResultStatus.success && globalSearchResult.data.vehicles?.length > 0 &&
                <>
                    <Typography variant="h5" component="h3" sx={{ my: 3, textAlign: 'center' }}>Ve??culos encontrados:</Typography>

                    <Grid container spacing={1} sx={{ my: 3 }}>
                        {globalSearchResult.data.vehicles.map((vehicle: Vehicle) => (
                            <Grid item key={vehicle.id} xs={12} lg={6}>
                                <VehicleCard {...vehicle} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            }

            {globalSearchResult.status === ApiResultStatus.success && !globalSearchResult.data.brands?.length && !globalSearchResult.data.models?.length && !globalSearchResult.data.vehicles?.length && <p>:( Nenhum registro econtrado</p>}

            {/* Cards pr?? definidos */}
            <Typography variant="h4" component="h2" sx={{ mb: 3, mt: 10, textAlign: 'center' }}>Selecione uma das op????es a seguir:</Typography>
            <Grid container spacing={3} sx={{ mb: 10 }}>
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