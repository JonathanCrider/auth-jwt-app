import express from 'express'
import { createUser, loginUser } from '../controllers/accessController.js'

const router = express.Router()

// CREATE
router.post('/signup', createUser)

// LOGIN
router.post('/login', loginUser)

export default router
