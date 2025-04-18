import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../db/db.js'


// Create user/signup
export const createUser = async (req, res, next) => {
  const { username, password, email } = req.body

  const hashedPassword = await bcrypt.hash(password, 8)
  db.users.push({ username, password: hashedPassword, email })

  res.status(201).send(`User ${username} created successfully`)
}

// User Login
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body
  const user = db.users.find(u => u.username === username)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials')
  }

  // Create jwt access token
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
  const accessToken = jwt.sign({ userId: user.username, email: user.email }, accessTokenSecret, { expiresIn: '1m' })
  
  // Create and set jwt refresh token
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
  // refresh token must expire AFTER access token. Times are super short for testing
  const refreshToken = jwt.sign({ userId: user.username, email: user.email }, refreshTokenSecret, { expiresIn: '3m' })
  res.cookie('jwt', refreshToken, {
    httpsOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  }) // sameSite is none because it's just a local test project. Lax would be first choice for UX, Strict may cause too many issues

  res.status(200).send({ accessToken })
}

// Refresh JWT
export const refresh = (req, res, next) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET 

    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
      if (err) {
        res.status(401).send({ message: 'Invalid or expired token, please log in again' })
      } else {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const accessToken = jwt.sign({ userId: user.userId, email: user.email }, accessTokenSecret, { expiresIn: '1m' })

        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
        const newRefreshToken = jwt.sign({ userId: user.userId, email: user.email }, refreshTokenSecret, { expiresIn: '3m' })
        res.cookie('jwt', newRefreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).send({ accessToken })
      }
    })
  } else {
    res.status(401).send({ message: 'Invalid or expired token, please log in again' })
  }
}
