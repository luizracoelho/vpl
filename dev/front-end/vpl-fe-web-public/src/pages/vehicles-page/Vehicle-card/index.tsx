import { ChevronRight, DirectionsCar, TwoWheeler } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { VehicleType } from "../../../models/model";
import { Vehicle } from "../../../models/vehicle";

const VehicleCard = ({ id, name, type, brandName, brandLogo, brandId, modelId, modelYear, productionYear, model }: Vehicle) => {

    const navigate = useNavigate();

    const goToVehicle = () => {

        if (brandId && modelId)
            navigate(`/brands/${brandId}/models/${modelId}/vehicle/details/${id}`, {
                state: {
                    modelName: model,
                    brandLogo: brandLogo,
                    brandId: brandId,
                    vehicleName: name,
                    modelYear: modelYear,
                    productionYear: productionYear
                }
            });

    };

    const VehicleTypeAvatar = () => {
        switch (type) {
            case VehicleType.Car:
                return (<DirectionsCar style={{ fontSize: 48 }} />);
            case VehicleType.Moto:
                return (<TwoWheeler style={{ fontSize: 48 }} />);
            default:
                return (<Typography variant="h4">{name[0]}</Typography>);
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={goToVehicle}>
                <CardContent sx={{ height: '100%' }}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        mr: 3
                                    }}>
                                    <VehicleTypeAvatar />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText disableTypography
                                primary={<Typography gutterBottom variant="h6" component="div">
                                    {name}
                                </Typography>}
                                secondary={<>
                                    <Typography gutterBottom variant="subtitle2" component="div">
                                        {/* {description} */}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src={brandLogo}
                                            alt={brandName}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                mr: 1
                                            }}>
                                            <Typography variant="h4">{brandName[0]}</Typography>
                                        </Avatar>
                                        <Typography gutterBottom variant="subtitle2" component="div" sx={{ mb: 0 }}>
                                            {brandName}
                                        </Typography>
                                    </Box>
                                </>} />
                            <ChevronRight sx={{
                                fontSize: 48,
                                color: "grey.400"
                            }} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default VehicleCard;