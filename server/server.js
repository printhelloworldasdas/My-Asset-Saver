const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

// 🔥 SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "../public")));

// 🔥 API
app.get("/api/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const r = await fetch(`https://assetdelivery.roblox.com/v1/asset/?id=${id}`);
        const text = await r.text();

        const match = text.match(/rbxassetid:\/\/(\d+)/);

        if (!match) return res.json({ error: "No template" });

        const textureId = match[1];
        const url = `https://assetdelivery.roblox.com/v1/asset/?id=${textureId}`;

        res.json({ url });

    } catch {
        res.json({ error: "Fail" });
    }
});

// 🔥 RUTA PRINCIPAL (IMPORTANTE)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(3000, () => console.log("http://localhost:3000"));
