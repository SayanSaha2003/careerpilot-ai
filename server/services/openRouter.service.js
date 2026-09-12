import axios from "axios";

export const askAi = async (messages) => {
    try {
        // Make a POST request to the OpenRouter API
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            // Request body
            {
                model: "openai/gpt-4o-mini",
                messages: messages,
            },
            // Request headers
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            },
        );

        // Check if the response is valid and contains the expected data
        const content = response?.data?.choices[0]?.message?.content;
        if (!content || !content.trim()) {
            throw new Error("AI returned empty response.");
        }
        return content;
    } catch (error) {
        console.error("OpenRouter Error:", error);
        throw new Error("OpenRouter API Error");
    }
};
