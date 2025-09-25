import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor";

const MainLayout = () => {
    useAxiosInterceptor();

    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )
};

export default MainLayout;