export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  try {
    const r = await fetch("https://pastebin.com/raw/NkpFVKUN")
    const texto = await r.text()
    res.status(200).send(texto.trim())
  } catch (e) {
    res.status(500).send("Erro")
  }
}
