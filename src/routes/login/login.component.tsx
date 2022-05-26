import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebase.utils";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import "./login.styles.scss";

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                history("/", { replace: true });
            })
            .catch((error: { message: any }) => alert(error.message));
    };

    const register = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth: any) => {
                if (auth) {
                    history("/", { replace: true });
                }
            })
            .catch((error: { message: any }) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={signIn}
                        type="submit"
                        className="login__signInButton"
                    >
                        Sign In
                    </button>
                </form>

                <p>
                    By signing-in you agree to our Terms of Use, and our Privacy
                    Policy.
                </p>

                <button className="login__registerButton" onClick={register}>
                    Create your New Account{" "}
                </button>
            </div>
        </div>
    );
}

export default Login;
