import { ChevronRight } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Model } from "../../../models/model";

const ModelCard = ({ id, brandId, brand, name, description }: Model) => {

    const navigate = useNavigate();

    const goToVehicle = () => {
        navigate(`/brands/${brandId}/models/${id}/vehicles`, {
            state: {
                brandName: brand,
                // brandLogo: logo
                modelName: name,
                modelDescription: description
            }
        });
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
                                    <Typography variant="h4">{name[0]}</Typography>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography gutterBottom variant="h6" component="div">
                                    {name}
                                </Typography>}
                                secondary={description} />
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

export default ModelCard;