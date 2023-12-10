import { Fragment } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import "./Styles/Layout.css";
import SideNav from "./Components/SideNav";
import Footer from "./Components/Footer";

const Layout = () => {

    return <Fragment>
        <Header />
        <div className="layout">
            <div className="layout-wrapper">
                <div className="layout-grid">
                    <SideNav />
                    <main className="main-page">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
        <Footer />
    </Fragment>

}

export default Layout;