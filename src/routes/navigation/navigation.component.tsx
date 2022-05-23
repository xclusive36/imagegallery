import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/fishing-svgrepo-com.svg";

import "./navigation.styles.scss";

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <Logo className="logo" />
                </Link>
                <h1 className="title">Image Gallery</h1>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/about">
                        About
                    </Link>
                    <Link className="nav-link" to="/blog">
                        Blog
                    </Link>
                    <Link className="nav-link" to="/user">
                        My Account
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
