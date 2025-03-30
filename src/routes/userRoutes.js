import express from 'express'
import { getUsers } from '../controllers/userController.js'

const router = express.Router()

// GET
router.get('/all', getUsers)

export default router
