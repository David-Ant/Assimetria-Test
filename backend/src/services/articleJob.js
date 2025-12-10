import callAI from "./aiClient.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client/client.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({adapter});

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
        const article = await prisma.article.create({
            data: {
                title: title,
                content: body,
            },
        });
        return article;
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
