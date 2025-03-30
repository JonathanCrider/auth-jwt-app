import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../db/db.js'


// Create user/signup
export const createUser = async (req, res, next) => {
  const { username, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 8)
  db.users.push({ username, password: hashedPassword })

  res.status(201).send(`User ${username} created successfully`)
}

// User Login

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body
  const user = db.users.find(u => u.username === username)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials')
  }

  const secretKey = process.env.SECRET_KEY
  const token = jwt.sign({ userId: user.username }, secretKey, { expiresIn: '1m' })
  // Would need to also create/store a refresh token for better user experience

  res.status(200).send({ token })
}
