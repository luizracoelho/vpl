import { Avatar, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../../models/menu";

const HomeCard = (menu: Menu) => {
    const { text, route, description } = menu;

    const navigate = useNavigate();

    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }} onClick={() => navigate(route)}>
                <CardContent sx={{ height: '100%' }}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    {/* <FontAwesomeIcon icon={icon} /> */}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography gutterBottom variant="h6" component="div">
                                    {text}
                                </Typography>}
                                secondary={<Typography gutterBottom variant="subtitle2" component="div">
                                    {description}
                                </Typography>} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default HomeCard;