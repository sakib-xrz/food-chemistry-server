import express from 'express'
import orderController from './order.controller'
const router = express.Router()

router.post('/create', orderController.createOrder)
router.get('/:email', orderController.getOrders)
router.get('/data/total', orderController.totalData)
router.get('/', orderController.all)

export default router
