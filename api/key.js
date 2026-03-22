import crypto from 'crypto'

function tokenValido(token) {
  const agora = Math.floor(Date.now() / 600000)
  for (const periodo of [agora, agora - 1]) {
    const esperado = crypto
      .createHmac('sha256', process.env.TOKEN_SECRET)
      .update(String(periodo))
      .digest('hex')
    if (token === esperado) return true
  }
  return false
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  const { t } = req.query
  if (!t || !tokenValido(t)) {
    return res.status(403).send("Token inválido ou expirado")
  }
  try {
    const r = await fetch("https://pastebin.com/raw/NkpFVKUN")
    const texto = await r.text()
    res.status(200).send(texto.trim())
  } catch (e) {
    res.status(500).send("Erro")
  }
}
