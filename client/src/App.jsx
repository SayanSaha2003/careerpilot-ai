import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

export const serverUrl = "http://localhost:5000";

function App() {
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(
                    `${serverUrl}/api/user/current-user`,
                    {
                        withCredentials: true,
                    },
                );
                console.log(user.data);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };
        getUser();
    }, []);

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
