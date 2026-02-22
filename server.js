import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   📦 RUTAS
========================= */
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

/* =========================
   📁 ARCHIVOS ESTÁTICOS
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

/* =========================
   🏠 HOME
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* =========================
   🧠 MONGO DB
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log("Error Mongo:", err));

/* =========================
   🌐 PUERTO DINÁMICO (Render)
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor VisionFit corriendo en puerto ${PORT}`);
});