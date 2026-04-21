const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("../public"));

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

app.listen(3000, () => console.log("http://localhost:3000"));
