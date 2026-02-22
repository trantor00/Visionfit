const openBtn = document.getElementById("openBtn");
const urlInput = document.getElementById("urlInput");
const reader = document.getElementById("reader");

openBtn.addEventListener("click", async () => {
  let url = urlInput.value.trim();

  if (!url) {
    alert("Introduce una web");
    return;
  }

  // Si no empieza por http, lo añadimos
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  reader.innerHTML = "Cargando modo lectura...";

  try {
    const response = await fetch(`http://localhost:3000/api/reader?url=${encodeURIComponent(url)}`);
    const html = await response.text();

    reader.innerHTML = html;
  } catch (error) {
    reader.innerHTML = "Error cargando la página.";
    console.error(error);
  }
});