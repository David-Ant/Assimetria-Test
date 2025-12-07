import { Router } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client/client.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const articleRoutes = Router();
const prisma = new PrismaClient({adapter});

// Temporary placeholder methods
articleRoutes.get("/", (req, res) => {
    res.send({ data: "Welcome to the Articles API" });
});

articleRoutes.post("/", (req, res) => {
    res.send({ data: "Article created"});
});

articleRoutes.put("/", (req, res) => {
    res.send({ data: "Article updated"});
});

articleRoutes.delete("/", (req, res) => {
    res.send({ data: "Article deleted"});
});

export default articleRoutes;