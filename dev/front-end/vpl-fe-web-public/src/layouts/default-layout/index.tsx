import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";

const DefaultLayout = () => (
    <>
        <Header />

        <Container component="main" sx={{ mt: 10 }}>
            <Outlet />
        </Container>
    </>
)

export default DefaultLayout;