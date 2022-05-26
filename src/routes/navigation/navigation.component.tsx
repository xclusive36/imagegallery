import { signOut } from "firebase/auth";
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
        signOption = (
            <>
                <Link className="myButton" to="/user">
                    My Account
                </Link>
                <Link
                    onClick={handleAuthentication}
                    className="myButton"
                    to="/login"
                >
                    Sign Out
                </Link>
            </>
        );
    } else {
        signOption = (
            <Link className="myButton" to="/login">
                Sign In
            </Link>
        );
    }

    return (
        <>
            <div className="navigation">
                <div className="nav-links-container">
                    <Link className="myButton" to="/">
                        Home
                    </Link>
                    <Link className="myButton" to="/about">
                        About
                    </Link>
                    {signOption}
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
