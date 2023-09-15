import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { Outlet, useNavigate } from "react-router";

const HomeRoutes = () => {
    const navigate = useNavigate();
    return (
        <>
            <Outlet />
            <BackButton onClick={() => navigate(-1)} />
        </>
    )
}

export default HomeRoutes;