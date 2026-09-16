import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Timer({ timeLeft, totalTime }) {
    const percentage = (timeLeft / totalTime) * 100;

    return (
        <div className="h-24 w-24">
            <CircularProgressbar
                value={percentage}
                text={`${timeLeft}s`}
                styles={{
                    path: {
                        stroke: "#10b981",
                        strokeLinecap: "round",
                        transition: "stroke-dashoffset 0.5s ease 0s",
                    },
                    trail: {
                        stroke: "rgba(16, 185, 129, 0.12)",
                    },
                    text: {
                        fill: "#ffffff",
                        fontSize: "20px",
                        fontWeight: "600",
                    },
                }}
            />
        </div>
    );
}

export default Timer;
