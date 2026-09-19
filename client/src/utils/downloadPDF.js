import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (report) => {
    if (!report) return;

    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    const finalScore = Number(report.finalScore);
    const confidence = Number(report.confidence);
    const communication = Number(report.communication);
    const correctness = Number(report.correctness);

    const questions = report.questionWiseScores || [];

    const emerald = [16, 185, 129];
    const darkBg = [2, 8, 7];
    const cardBg = [5, 12, 9];
    const border = [20, 70, 55];
    const white = [255, 255, 255];
    const muted = [148, 163, 184];

    // ================= PAGE BACKGROUND =================

    const drawBackground = () => {
        doc.setFillColor(...darkBg);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
    };

    const addFooter = () => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...muted);

        doc.text("CareerPilotAI • AI Interview Performance Report", margin, pageHeight - 8);

        doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - margin, pageHeight - 8, {
            align: "right",
        });
    };

    const addPage = () => {
        doc.addPage();
        drawBackground();
    };

    drawBackground();

    // ================= HEADER =================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...white);

    doc.text("Interview Analytics Dashboard", margin, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);

    doc.text("AI-powered interview performance insights", margin, 28);

    doc.setDrawColor(...emerald);
    doc.setLineWidth(0.5);

    doc.line(margin, 34, pageWidth - margin, 34);

    let currentY = 44;

    // ================= OVERALL PERFORMANCE =================

    doc.setFillColor(...cardBg);
    doc.setDrawColor(...border);

    doc.roundedRect(margin, currentY, contentWidth, 45, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...emerald);

    doc.text("Overall Performance", pageWidth / 2, currentY + 9, { align: "center" });

    // Score circle

    const centerX = pageWidth / 2;
    const centerY = currentY + 27;

    doc.setDrawColor(30, 70, 60);
    doc.setLineWidth(3);

    doc.circle(centerX, centerY, 10, "S");

    doc.setDrawColor(...emerald);
    doc.setLineWidth(3);

    doc.circle(centerX, centerY, 10, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...white);

    doc.text(`${finalScore}/10`, centerX, centerY + 1, { align: "center" });

    currentY += 55;

    // ================= SKILL EVALUATION =================

    doc.setFillColor(...cardBg);
    doc.setDrawColor(...border);

    doc.roundedRect(margin, currentY, contentWidth, 48, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...white);

    doc.text("Skill Evaluation", margin + 8, currentY + 9);

    const skills = [
        {
            name: "Confidence",
            score: confidence,
        },
        {
            name: "Communication",
            score: communication,
        },
        {
            name: "Correctness",
            score: correctness,
        },
    ];

    skills.forEach((skill, index) => {
        const y = currentY + 18 + index * 10;
        const percentage = Math.max(0, Math.min(100, (skill.score / 10) * 100));

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...muted);

        doc.text(skill.name, margin + 8, y);

        doc.setTextColor(...emerald);

        doc.text(skill.score.toFixed(1), pageWidth - margin - 8, y, { align: "right" });

        // Background bar

        doc.setFillColor(20, 30, 27);

        doc.roundedRect(margin + 8, y + 2, contentWidth - 16, 3, 1.5, 1.5, "F");

        // Progress

        doc.setFillColor(...emerald);

        doc.roundedRect(
            margin + 8,
            y + 2,
            ((contentWidth - 16) * percentage) / 100,
            3,
            1.5,
            1.5,
            "F",
        );
    });

    currentY += 58;

    // ================= PERFORMANCE TREND =================

    doc.setFillColor(...cardBg);
    doc.setDrawColor(...border);

    doc.roundedRect(margin, currentY, contentWidth, 75, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...white);

    doc.text("Performance Trend", margin + 8, currentY + 10);

    const chartX = margin + 15;
    const chartY = currentY + 18;
    const chartWidth = contentWidth - 25;
    const chartHeight = 45;

    // Grid lines

    doc.setDrawColor(25, 45, 40);
    doc.setLineWidth(0.2);

    for (let value = 0; value <= 10; value += 2) {
        const y = chartY + chartHeight - (value / 10) * chartHeight;

        doc.line(chartX, y, chartX + chartWidth, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        doc.setTextColor(...muted);

        doc.text(`${value}`, chartX - 5, y + 2, { align: "right" });
    }

    // Performance line

    if (questions.length > 0) {
        const points = questions.map((item, index) => {
            const x = chartX + (index / Math.max(questions.length - 1, 1)) * chartWidth;

            const y = chartY + chartHeight - (Number(item.score) / 10) * chartHeight;

            return { x, y };
        });

        doc.setDrawColor(...emerald);
        doc.setLineWidth(0.8);

        for (let i = 1; i < points.length; i++) {
            doc.line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
        }

        points.forEach((point, index) => {
            doc.setFillColor(...emerald);

            doc.circle(point.x, point.y, 1.4, "F");

            doc.setFont("helvetica", "normal");
            doc.setFontSize(6);
            doc.setTextColor(...muted);

            doc.text(`Q${index + 1}`, point.x, chartY + chartHeight + 7, { align: "center" });
        });
    }

    currentY += 85;

    // ================= QUESTION BREAKDOWN =================

    addPage();
    currentY = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...white);

    doc.text("Question Breakdown", margin, currentY);

    currentY += 7;

    // ================= QUESTION TABLE =================

    autoTable(doc, {
        startY: currentY,

        margin: {
            left: margin,
            right: margin,
        },

        head: [["#", "Question", "Score", "AI Feedback"]],

        body: questions.map((question, index) => [
            `${index + 1}`,
            question.question || "No question available",
            `${question.score}/10`,
            question.feedback || "No feedback available",
        ]),

        theme: "grid",

        styles: {
            font: "helvetica",
            fontSize: 8,
            cellPadding: 4,
            textColor: white,
            fillColor: cardBg,
            lineColor: border,
            lineWidth: 0.2,
            valign: "top",
        },

        headStyles: {
            fillColor: emerald,
            textColor: [0, 0, 0],
            fontStyle: "bold",
            halign: "center",
        },

        alternateRowStyles: {
            fillColor: [4, 15, 11],
        },

        columnStyles: {
            0: {
                cellWidth: 10,
                halign: "center",
            },

            1: {
                cellWidth: 55,
            },

            2: {
                cellWidth: 20,
                halign: "center",
            },

            3: {
                cellWidth: "auto",
            },
        },
        willDrawPage: () => {
            drawBackground();
        },
    });

    // ================= PROFESSIONAL ADVICE =================

    const advice =
        finalScore >= 8
            ? "Excellent performance. Maintain your confidence and structured approach. Continue refining clarity and supporting your answers with strong real-world examples."
            : finalScore >= 5
              ? "Good foundation demonstrated. Focus on improving clarity, answer structure, and confidence. Practice delivering concise responses supported by relevant examples."
              : "Significant improvement is required. Focus on structured thinking, clear communication, and confident delivery. Practice answering interview questions aloud on a regular basis.";

    let adviceY = doc.lastAutoTable.finalY + 12;

    // If there isn't enough space, create another page
    if (adviceY + 45 > pageHeight - 15) {
        addPage();
        adviceY = 20;
    }

    doc.setFillColor(...cardBg);
    doc.setDrawColor(...border);

    doc.roundedRect(margin, adviceY, contentWidth, 38, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...emerald);

    doc.text("Professional Advice", margin + 8, adviceY + 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...muted);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 16);

    doc.text(splitAdvice, margin + 8, adviceY + 18);

    // ================= FOOTERS =================

    const totalPages = doc.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
        doc.setPage(page);
        addFooter();
    }

    // ================= DOWNLOAD =================

    doc.save("CareerPilotAI_Interview_Report.pdf");
};
