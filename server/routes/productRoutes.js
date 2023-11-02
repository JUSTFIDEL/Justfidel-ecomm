import express from 'express'
import Product from '../models/productModel.js'

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
	const products = await Product.find()
	res.send(products)
})

productRouter.get('/id/:_id', async (req, res) => {
	const products = await Product.findOne({ id: req.params.id })
	if (products) {
		res.send(products)
	} else {
		res.status(404).send({ message: 'Product Not Found' })
	}
})

productRouter.get('/:_id', async (req, res) => {
	const products = await Product.findById(req.params._id)
	if (products) {
		res.send(products)
	} else {
		res.status(404).send({ message: 'Product Not Found' })
	}
})

export default productRouter
