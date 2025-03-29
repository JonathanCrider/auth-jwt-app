import jwt from 'jsonwebtoken'


export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) res.status(401).send('Unauthorized')
  
  const secretKey = process.env.SECRET_KEY
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid or expired token')
    req.user = user
    next()
  })
}
