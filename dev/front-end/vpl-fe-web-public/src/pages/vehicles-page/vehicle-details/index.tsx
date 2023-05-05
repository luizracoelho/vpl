import { DirectionsCar, TwoWheeler } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, CardHeader, Chip, Divider, Grid, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { PriceReference } from "../../../enums/price-reference.enum";
import { VehicleType } from "../../../models/model";
import VehiclePriceReferenceTable from "../vehicle-price-reference-table";
import ChartComponent from "../../../components/chart";
import { Vehicle } from "../../../models/vehicle";
import { useEffect, useState } from "react";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import useFindVehicle from "../../../hooks/vehicle/use-find-vehicle";

enum Flows {
    BrandModel,
    PriceYear,
    Default
}

const VehicleDetailsDefault = ({ name, type, modelYear, productionYear, model }: Vehicle) => {
    const { id } = useParams();

    return (
        <>
            {/* Cabeçalho */}
            <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h1" component="h1">Sobre</Typography>
                    <Typography variant="h5" component="h1">Informações sobre o veículo: {name}</Typography>
                </Box>
            </Box>
            <Box mb={2}>
                <Divider />
            </Box>

            <Card sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item mr={0} xl={6} md={6} sm={12} p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box ml={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={'teste'}
                                alt={'brandName'}
                                sx={{
                                    width: '50%',
                                    height: '100%'
                                }}>
                                {getAvatarVehicle(type, name)}
                            </Avatar>
                        </Box>
                        <Box ml={10}>
                            <Divider orientation="vertical" />
                        </Box>
                    </Grid>

                    {/* Dados Veiculo */}
                    <Grid item xl={6} md={6} sm={12} p={1}>
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{modelYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Fabricação</strong></Typography>
                            <Typography variant='body1' component='p'>{productionYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{model}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Tipo</strong></Typography>
                            <Typography variant='body1' component='p'>{getTypeVehicle(type)}</Typography>
                        </Box>
                    </Grid>
                    <Divider />
                </Grid>
            </Card>

            <Card sx={{ mt: 3 }}>
                <CardHeader title="FIPE"></CardHeader>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <VehiclePriceReferenceTable vehicleId={parseInt(id!)} priceReference={PriceReference.Fipe} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <ChartComponent vehicleId={parseInt(id!)} priceReference={PriceReference.Fipe} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
                <CardHeader title="Molicar"></CardHeader>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <VehiclePriceReferenceTable vehicleId={parseInt(id!)} priceReference={PriceReference.Molicar} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <ChartComponent vehicleId={parseInt(id!)} priceReference={PriceReference.Molicar} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </>
    );
}

const VehicleDetailsBrandModel = ({ name, type, modelYear, productionYear, model, brandLogo }: Vehicle) => {
    const { vehicleId } = useParams();

    return (
        <>
            {/* Cabeçalho */}
            <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h1" component="h1">Sobre</Typography>
                    <Typography variant="h5" component="h1">Informações sobre o veículo: {name}</Typography>
                </Box>
                <Avatar
                    src={brandLogo}
                    sx={{
                        width: 120,
                        height: 120
                    }}>
                </Avatar>
            </Box>
            <Box mb={2}>
                <Divider />
            </Box>

            <Card sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item mr={0} xl={6} md={6} sm={12} p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box ml={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={'teste'}
                                alt={'brandName'}
                                sx={{
                                    width: '50%',
                                    height: '100%'
                                }}>
                                {getAvatarVehicle(type, name)}
                            </Avatar>
                        </Box>
                        <Box ml={10}>
                            <Divider orientation="vertical" />
                        </Box>
                    </Grid>

                    {/* Dados Veiculo */}
                    <Grid item xl={6} md={6} sm={12} p={1}>
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{modelYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Fabricação</strong></Typography>
                            <Typography variant='body1' component='p'>{productionYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{model}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Tipo</strong></Typography>
                            <Typography variant='body1' component='p'>{getTypeVehicle(type)}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ mt: 3 }}>
                <CardHeader title="FIPE"></CardHeader>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <VehiclePriceReferenceTable vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Fipe} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <ChartComponent vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Fipe} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
                <CardHeader title="Molicar"></CardHeader>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <VehiclePriceReferenceTable vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Molicar} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <ChartComponent vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Molicar} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

const VehicleDetailsPriceYear = ({ name, type, modelYear, productionYear, model }: Vehicle) => {
    const { vehicleId, priceReference, year } = useParams();

    return (
        <>
            {/* Cabeçalho */}
            <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h1" component="h1">Sobre</Typography>
                    <Typography variant="h5" component="h1">Informações sobre o veículo: {name}</Typography>
                </Box>
            </Box>
            <Box mb={2}>
                <Divider />
            </Box>

            <Card sx={{ width: '100%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item mr={0} xl={6} md={6} sm={12} p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box ml={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                alt={'brandName'}
                                sx={{
                                    width: '50%',
                                    height: '100%'
                                }}>
                                {getAvatarVehicle(type, name)}
                            </Avatar>
                        </Box>
                        <Box ml={10}>
                            <Divider orientation="vertical" />
                        </Box>
                    </Grid>

                    {/* Dados Veiculo */}
                    <Grid item xl={6} md={6} sm={12} p={1}>
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{modelYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Ano Fabricação</strong></Typography>
                            <Typography variant='body1' component='p'>{productionYear}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Modelo</strong></Typography>
                            <Typography variant='body1' component='p'>{model}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography component='small' variant="overline"><strong>Tipo</strong></Typography>
                            <Box>
                                <Typography variant='body1' component='p'>{getTypeVehicle(type)}</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant='overline' component='small'>Valor no Ano</Typography>
                        </Box>
                        <Box>
                            <Chip color="primary" label={year} sx={{ mr: 1 }} /><Typography variant='body1' component='strong'>?????</Typography>
                        </Box>
                    </Grid>
                    <Divider />
                </Grid>
            </Card>

            {parseInt(priceReference!) === PriceReference.Fipe &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="FIPE"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Fipe} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Fipe} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }

            {parseInt(priceReference!) === PriceReference.Molicar &&
                <Card sx={{ mt: 3 }}>
                    <CardHeader title="Molicar"></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6}>
                                <VehiclePriceReferenceTable vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Molicar} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ChartComponent vehicleId={parseInt(vehicleId!)} priceReference={PriceReference.Molicar} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }
        </>
    );
}

function getPriceReference(value: Number) {
    const type = value as PriceReference;

    switch (type) {
        case PriceReference.Fipe:
            return 'FIPE'
        case PriceReference.Molicar:
            return 'MOLICAR'
        default:
            return 'INDEFINIDO'
    }
}

function getTypeVehicle(value: Number) {
    const type = value as VehicleType;

    switch (type) {
        case VehicleType.Car:
            return 'CARRO'
        case VehicleType.Bus:
            return 'ÔNIBUS'
        case VehicleType.Moto:
            return 'MOTO'
        case VehicleType.Van:
            return 'VAN'
        case VehicleType.Truck:
            return 'CARRETA'
        default:
            return 'INDEFINIDO'
    }
}

function getAvatarVehicle(value: Number, name: string) {
    const type = value as VehicleType;

    switch (type) {
        case VehicleType.Car:
            return (<DirectionsCar style={{ fontSize: 48 }} />);
        case VehicleType.Moto:
            return (<TwoWheeler style={{ fontSize: 48 }} />);
        default:
            return (<Typography variant="h4">{name[0]}</Typography>);
    }
}

function getFlow(modelId: any, brandId: any,
    priceReference: any, year: any) {

    return modelId && brandId ? Flows.BrandModel :
        priceReference && year ? Flows.PriceYear :
            Flows.Default
}

const VehicleDetails = () => {
    const [vehicleResult, setVehicleResult] = useState<ApiResult>(ApiResult.start());
    const { vehicleId, modelId, brandId, priceReference, year } = useParams();
    const flow = getFlow(modelId, brandId, priceReference, year);

    const findVehicle = useFindVehicle();

    const fetchData = async () => {
        setVehicleResult(await findVehicle(parseInt(vehicleId!)));
    }

    useEffect(() => {
        if (vehicleResult.status === ApiResultStatus.loading)
            fetchData();
    })

    let renderFlow: JSX.Element;

    switch (flow) {
        case Flows.BrandModel:
            renderFlow = <VehicleDetailsBrandModel {...vehicleResult.data} />;
            break;
        case Flows.PriceYear:
            renderFlow = <VehicleDetailsPriceYear {...vehicleResult.data} />;
            break;
        default:
            renderFlow = <VehicleDetailsDefault {...vehicleResult.data} />
            break;
    }

    return (
        <>
            {vehicleResult.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {vehicleResult.status === ApiResultStatus.error && <p>{vehicleResult.errorMessage ?? '-'}</p>}
            {vehicleResult.status === ApiResultStatus.success && renderFlow}
        </>
    );
}

export default VehicleDetails;