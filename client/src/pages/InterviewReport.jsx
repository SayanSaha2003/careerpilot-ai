import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import Step3Report from "../components/Step3Report";

function InterviewReport() {
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    // Fetch the interview report based on the ID 
    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(serverUrl + "/api/interview/report/" + id, {
                    withCredentials: true,
                });
                console.log(response.data);
                setReport(response.data);
            } catch (error) {
                console.error("Error fetching interview report:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getReport();
    }, [id]);

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#020807]">
                <div className="text-sm text-emerald-400">Loading interview report...</div>
            </div>
        );
    }

    return <Step3Report report={report} />;
}

export default InterviewReport;
