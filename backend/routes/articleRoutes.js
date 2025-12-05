import { Router } from "express";

const articleRoutes = Router();

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