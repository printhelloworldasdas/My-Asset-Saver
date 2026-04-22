const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal - sirve el index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

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

// Usar el puerto que asigna Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
