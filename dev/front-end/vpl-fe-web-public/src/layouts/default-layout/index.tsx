import { Container } from "@mui/material";
import Header from "components/header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => (
    <>
        <Header />

        <Container component="main" sx={{ mt: 10 }}>
            <Outlet />
        </Container>
    </>
)

export default DefaultLayout;