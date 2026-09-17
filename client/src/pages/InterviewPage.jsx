import { useState } from "react";

import Step1SetUp from "../components/Step1SetUp";
import Step2Interview from "../components/Step2Interview";
import Step3Report from "../components/Step3Report";

function InterviewPage() {
    const [step, setStep] = useState(1);
    const [interviewData, setInterviewData] = useState(null);
    const [interviewer, setInterviewer] = useState("female");

    return (
        <div className="min-h-screen">
            {step === 1 && (
                <Step1SetUp
                    onStart={(data , interviewer) => {
                        setInterviewData(data);
                        setInterviewer(interviewer);
                        setStep(2);
                    }}
                />
            )}

            {step === 2 && (
                <Step2Interview
                    interviewData={interviewData}
                    interviewer={interviewer}
                    onFinish={(report) =>{ 
                        setInterviewData(report);
                        setStep(3);
                    }}
                />
            )}

            {step === 3 && <Step3Report report={interviewData} />}
        </div>
    );
}

export default InterviewPage;
