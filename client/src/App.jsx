import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";

export const serverUrl = "http://localhost:5000";

function App() {

    const dispatch = useDispatch();

    // Fetch the current user and update the Redux store on component mount
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(
                    serverUrl + "/api/user/current-user",
                    { withCredentials: true },
                );
                // Update the Redux store with the fetched user data
                dispatch(setUserData(user.data));
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null)); // Clear user data on error
            }
        };
        getUser();
    }, [dispatch]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </div>
    );
}

export default App;
