import express from 'express'
import { auth } from './middleware/authMiddleware.js'
import { userRoutes, protectedRoutes } from './routes/index.js'

export const app = express()
app.use(express.json())


app.use('/users', userRoutes)

// Any route below is forced to use auth with .use()
// Probably would have different naming for the signup and login route and controller
// but this is fine for now.
app.use(auth)

app.use('/protected', protectedRoutes)
