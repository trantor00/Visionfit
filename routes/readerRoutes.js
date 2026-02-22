import express from "express";

const router = express.Router();

/* =========================
   📖 LECTOR WEB
========================= */
router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL requerida" });
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