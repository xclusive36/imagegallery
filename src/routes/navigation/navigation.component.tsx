import { signOut } from "firebase/auth";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/fishing-svgrepo-com.svg";
import { auth } from "../../firebase/firebase.utils";
import { useStateValue } from "../../StateProvider";

import "./navigation.styles.scss";

const Navigation = () => {
    const [{ user }] = useStateValue();

    let signOption;

    const handleAuthentication = () => {
        if (user) {
            signOut(auth);
        }
    };

    if (user) {
        signOption = (<Link className="nav-link" to="/login">
        <div
            className="header__option"
            onClick={handleAuthentication}
        >
            Sign Out
        </div>
    </Link>);
    } else {
        signOption = (<Link className="nav-link" to="/login">
        <div
            className="header__option"
        >
            Sign In
        </div>
    </Link>);
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <Logo className="logo" />
                </Link>
                <h1 className="title">Image Gallery</h1>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                    <Link className="nav-link" to="/about">
                        About
                    </Link>
                    <Link className="nav-link" to="/user">
                        My Account
                    </Link>
                    {signOption}
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
