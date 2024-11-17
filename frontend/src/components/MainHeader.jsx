import { Outlet } from "react-router-dom";
import NavBarLinks from "./NavBarLinks";


function MainHeader({setIsAuthenticated}){

    return(
        <>
        <NavBarLinks setIsAuthenticated={setIsAuthenticated} />
        <Outlet />
        </>
    );
}

export default MainHeader;