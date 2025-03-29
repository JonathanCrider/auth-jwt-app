import express from 'express'
import { createUser, getUsers, loginUser } from '../controllers/userController.js'

const router = express.Router()

// GET
router.get('/all', getUsers)

// CREATE
router.post('/signup', createUser)

// LOGIN
router.post('/login', loginUser)

export default router
