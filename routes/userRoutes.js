import express from "express";

const router = express.Router();

/* =========================
   👤 REGISTRO DE USUARIO
========================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Aquí luego añadiremos MongoDB real
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: { name, email }
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro" });
  }
});

/* =========================
   🔑 LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    res.status(200).json({
      message: "Login correcto",
      token: "demo-token"
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el login" });
  }
});

export default router;
