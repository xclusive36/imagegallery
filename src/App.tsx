import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { json } from "stream/consumers";
import { auth } from "./firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Login from "./routes/login/login.component";
import Navigation from "./routes/navigation/navigation.component";
import { useStateValue } from "./StateProvider";

const About = () => <div>Welcome to our About page!</div>;

const User = () => {
    const [{ user }] = useStateValue();

    return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

const App = () => {
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                console.log(authUser);
                dispatch({
                    type: "SET_USER",
                    user: authUser,
                });
            } else {
                dispatch({
                    type: "SET_USER",
                    user: null,
                });
            }
        });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="user" element={<User />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    );
};

export default App;
