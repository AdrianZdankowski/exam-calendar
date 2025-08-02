import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor";

const MainLayout = () => {
    useAxiosInterceptor();

    return (
        <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        </>
    )
};

export default MainLayout;