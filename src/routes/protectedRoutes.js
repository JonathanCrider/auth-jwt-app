import express from 'express'
import { protectedResource } from '../controllers/protectedController.js'

const router = express.Router()

router.post('/', protectedResource)

export default router
