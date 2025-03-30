import express from 'express'
import { createUser, loginUser, refresh } from '../controllers/accessController.js'

const router = express.Router()

// CREATE
router.post('/signup', createUser)

// LOGIN
router.post('/login', loginUser)

// REFRESH
router.post('/refresh', refresh)

export default router
