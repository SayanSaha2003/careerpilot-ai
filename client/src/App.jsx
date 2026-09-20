import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import InterviewPage from "./pages/InterviewPage";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import InterviewHistory from "./pages/InterviewHistory";
import Pricing from "./pages/Pricing";
import InterviewReport from "./pages/InterviewReport";

// eslint-disable-next-line 
export const serverUrl = import.meta.env.VITE_SERVER_URL ;

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
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="history" element={<InterviewHistory />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="report/:id" element={<InterviewReport />} />
            </Routes>
        </div>
    );
}

export default App;
