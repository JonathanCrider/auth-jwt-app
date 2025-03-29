import express from 'express'
import { protectedRoute } from '../controllers/protectedController.js'

const router = express.Router()

router.post('/', protectedRoute)

export default router
