import callAI from "./aiClient.js";

const generateArticle = async () => {
    try {
        let response = await callAI();

        const thinkEndTag = "</think>";
        const thinkIndex = response.indexOf(thinkEndTag);
        if (thinkIndex !== -1) {
            response = response.slice(thinkIndex + thinkEndTag.length).trim();
        }

        // Split into lines
        const lines = response.split("\n").map(line => line.trim()).filter(line => line.length > 0);

        // First line is the title, the rest is the body
        const title = lines[0] || "";
        const body = lines.slice(1).join("\n");
        
        return { title, body };
    } catch (error) {
        console.error("Error generating article:", error);
        throw error;
    }
};

const postArticle = async (title, body) => {
    try {
        const response = await fetch(`http://localhost:4000/articles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content: body }),
        });

        if (!response.ok) {
            throw new Error(`Failed to post article: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting article:", error);
        throw error;
    }
};

export const runArticleJob = async () => {
    try {
        const { title, body } = await generateArticle();
        await postArticle(title, body);
    } catch (error) {
        console.error("Article job failed:", error);
    }
};
