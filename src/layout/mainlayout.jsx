import { Outlet } from "react-router-dom";
import NavSection from "../components/nav.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function MainLayout() {
    return(
        <>
            <NavSection></NavSection>
            <Outlet></Outlet>
            <ToastContainer/>
        </>
    )
}
export default MainLayout
