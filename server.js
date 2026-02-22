require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const PORT = 3000;


// 🔥 lector inteligente
app.get("/api/reader", async (req, res) => {
  try {
    let url = req.query.url;

    // si escribes marca, elpais etc
    if (!url.startsWith("http")) {
      url = "https://" + url + ".com";
    }

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = response.data;

    // intentar extraer artículo
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    // 🔥 si encuentra artículo
    if (article && article.content) {
      const clean = `
        <article style="max-width:800px;margin:auto">
          <h1>${article.title}</h1>
          ${article.content}
        </article>
      `;
      return res.send(clean);
    }

    // 🔥 si NO hay artículo → mostrar titulares
    const $ = cheerio.load(html);
    let links = [];

    $("a").each((i, el) => {
      const href = $(el).attr("href");
      const text = $(el).text().trim();

      if (href && text.length > 30 && href.startsWith("http")) {
        links.push({ href, text });
      }
    });

    // eliminar duplicados
    const unique = [];
    const seen = new Set();

    links.forEach(l => {
      if (!seen.has(l.href)) {
        seen.add(l.href);
        unique.push(l);
      }
    });

    // limitar resultados
    const top = unique.slice(0, 20);

    let htmlLinks = "<h2>Noticias destacadas</h2>";

    top.forEach(l => {
      htmlLinks += `<p><a href="${l.href}">${l.text}</a></p>`;
    });

    res.send(htmlLinks);

  } catch (error) {
    console.error(error);
    res.send("No se pudo extraer el contenido");
  }
});


app.listen(PORT, () => {
  console.log(`Servidor VisionFit corriendo en http://localhost:${PORT}`);
});