import express from "express";

const router = express.Router();

/* =========================
   📖 LECTOR WEB
========================= */
router.post("/", async (req, res) => {
  try {
    let { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL requerida" });
    }

    // 🔥 Añadir https automáticamente
    url = url.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    res.json({
      message: "Lector funcionando",
      url
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el lector" });
  }
});

export default router;