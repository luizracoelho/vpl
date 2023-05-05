import { DirectionsCar, TwoWheeler } from "@mui/icons-material";
import { Avatar, Box, Card, Divider, Grid, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { PriceReference } from "../../../enums/price-reference.enum";
import { VehicleType } from "../../../models/model";

enum Flows {
    BrandModel,
    PriceYear,
    Default
}

const VehicleDetailsDefault = () => {
    const { state } = useLocation();
    const { yearReference, priceReference, productionYear, modelYear, vehicleName, brandId, brandLogo, modelName, typeVehicle } = state;


    return <>
        {/* Cabeçalho */}
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
                <Typography variant="h1" component="h1">Sobre</Typography>
                <Typography variant="h5" component="h1">Informações sobre o veículo: {vehicleName}</Typography>
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
                        {getAvatarVehicle(typeVehicle, vehicleName)}
                        </Avatar>
                    </Box>
                    <Box ml={10}>
                        <Divider orientation="vertical" variant="horizontal" />
                    </Box>
                </Grid>

                {/* Dados Veiculo */}
                <Grid item xl={6} md={6} sm={12} p={1}>
                    <Box>
                        <Typography component='h6'><strong>Ano Modelo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{modelYear}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Ano Fabricação.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{productionYear}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Modelo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{modelName}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Tipo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{getTypeVehicle(typeVehicle)}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider />
            </Grid>
        </Card>
    </>
}

const VehicleDetailsBrandModel = () => {
    const {state} = useLocation();
    const {brandLogo, vehicleName, modelName, modelYear, productionYear, typeVehicle} = state;

    return <>
        {/* Cabeçalho */}
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h1" component="h1">Sobre</Typography>
                <Typography variant="h5" component="h1">Informações sobre o veículo: {vehicleName}</Typography>
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
                            {getAvatarVehicle(typeVehicle, vehicleName)}
                        </Avatar>
                    </Box>
                    <Box ml={10}>
                        <Divider orientation="vertical" variant="horizontal" />
                    </Box>
                </Grid>

                {/* Dados Veiculo */}
                <Grid item xl={6} md={6} sm={12} p={1}>
                    <Box>
                        <Typography component='h6'><strong>Ano Modelo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{modelYear}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Ano Fabricação.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{productionYear}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Modelo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{modelName}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Tipo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{getTypeVehicle(typeVehicle)}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            {/* Preços do ano selecionado ({getPriceReference(priceReference)}) */}
                            <Typography variant='strong' component='strong'>Tabela FIPE</Typography>
                        </Box>
                        <Box>
                        <Typography variant='strong' component='strong'>Gráfico FIPE</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <Typography variant='strong' component='strong'>Tabela MOLICAR</Typography>
                        </Box>
                        <Box>
                        <Typography variant='strong' component='strong'>Gráfico MOLICAR</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    </>
}

const VehicleDetailsPriceYear = () => {
    const { state } = useLocation();
    const { yearReference, priceReference, productionYear, modelYear, vehicleName, brandId, brandLogo, modelName, typeVehicle } = state;

    return <>
        {/* Cabeçalho */}
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
                <Typography variant="h1" component="h1">Sobre</Typography>
                <Typography variant="h5" component="h1">Informações sobre o veículo: {vehicleName}</Typography>
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
                            {getAvatarVehicle(typeVehicle, vehicleName)}
                        </Avatar>
                    </Box>
                    <Box ml={10}>
                        <Divider orientation="vertical" variant="horizontal" />
                    </Box>
                </Grid>

                {/* Dados Veiculo */}
                <Grid item xl={6} md={6} sm={12} p={1}>
                    <Box>
                        <Typography component='h6'><strong>Ano Modelo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{modelYear}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Ano Fabricação.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{productionYear}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Modelo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{modelName}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography component='h6'><strong>Tipo.</strong></Typography>
                        <Box>
                            <Typography variant='small' component='small'>{getTypeVehicle(typeVehicle)}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <Typography variant='strong' component='strong'>Tabela {getPriceReference(priceReference)} - {yearReference}</Typography>
                        </Box>
                        <Box>
                        <Typography variant='strong' component='strong'>Gráfico {getPriceReference(priceReference)} - {yearReference}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider />
            </Grid>
        </Card>
    </>
}


function getPriceReference(value: Number){
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

function getTypeVehicle(value: Number){
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

function getAvatarVehicle(value: Number, vehicleName: string){
    const type = value as VehicleType;
    
    switch (type) {
        case VehicleType.Car:
            return (<DirectionsCar style={{ fontSize: 48 }} />);
        case VehicleType.Moto:
            return (<TwoWheeler style={{ fontSize: 48 }} />);
        default:
            return (<Typography variant="h4">{vehicleName[0]}</Typography>);
    }
}

function getFlow(modelId: any, brandId: any, state: any, 
                 priceReference: any, year: any) {
    
    return modelId && brandId ? Flows.BrandModel :
                                         priceReference && year ? Flows.PriceYear :
                                                                  Flows.Default
}

const VehicleDetails = () => {
    const { vehicleId, modelId, brandId, priceReference, year } = useParams();
    const { state } = useLocation();

    
    const flow = getFlow(modelId, brandId, state, priceReference, year);

    switch (flow) {
        case Flows.BrandModel:
            return <VehicleDetailsBrandModel />
        case Flows.PriceYear:
            return <VehicleDetailsPriceYear />
        default:
            return <VehicleDetailsDefault />
    }
}

export default VehicleDetails;