import { Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    }

    return (
        <>
            <Container sx={{
                py: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Paper sx={{ p: 3, textAlign: 'center', display: 'inline-block' }}>
                    <Typography variant="h1" component="h1">404</Typography>
                    <Typography variant="h3" component="h3">Not Found</Typography>

                    <Button variant="contained" type="button" onClick={back} sx={{ mt: 5 }}>Voltar</Button>
                </Paper>
            </Container>
        </>
    );
}

export default NotFoundPage;