import { Avatar, Card, CardActionArea, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Menu } from "models/menu";
import { useNavigate } from "react-router-dom";

const HomeCard = (menu: Menu) => {
    const { text, route, description } = menu;

    const navigate = useNavigate();

    return (
        <Card className="w-100 h-100 mb-3">
            <CardActionArea className="h-100" onClick={() => navigate(route)}>
                <CardContent>
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
                                secondary={description} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default HomeCard;