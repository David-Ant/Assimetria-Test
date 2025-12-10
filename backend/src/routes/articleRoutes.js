import { Router } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client/client.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const articleRoutes = Router();
const prisma = new PrismaClient({adapter});

articleRoutes.get("/", async (req, res) => {
    try {
        const articles = await prisma.article.findMany();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).send({ error: "Error fetching articles" });
    }
});

articleRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const article = await prisma.article.findUnique({
            where: { id: id },
        });

        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.status(200).json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching article" });
    }
});

articleRoutes.post("/", async (req, res) => {
    try {
        const articleData = await prisma.article.create({
            data: {
                title: req.body.title,
                content: req.body.content,
            },
        });
        res.status(201).json(articleData)
    } catch (error) {
        res.status(500).send({ error: "Error creating article" });
    }
});

export default articleRoutes;