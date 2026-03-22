import crypto from 'crypto'

export default function handler(req, res) {
  const periodo = Math.floor(Date.now() / 30000)
  const token = crypto
    .createHmac('sha256', process.env.TOKEN_SECRET)
    .update(String(periodo))
    .digest('hex')
  res.redirect(`/?t=${token}`)
}
