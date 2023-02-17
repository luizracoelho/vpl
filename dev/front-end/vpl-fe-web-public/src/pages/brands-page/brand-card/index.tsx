import { ChevronRight } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Brand } from "../../../models/brand";

const BrandCard = (props: Brand) => {
    const { id, name, logo } = props;
    const navigate = useNavigate();

    const goToModel = () => {
        navigate(`/brands/${id}/models`, {
            state: {
                brandName: name,
                brandLogo: logo
            }
        });
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={goToModel}>
                <CardContent sx={{ height: '100%' }}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    src={logo}
                                    alt={name}
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
                                secondary={<Typography gutterBottom variant="subtitle2" component="div">
                                    Clique para ver os modelos
                                </Typography>} />
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

export default BrandCard;