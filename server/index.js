import express from 'express'
import cors from 'cors'
import data from './data.js'

const app = express()
app.use(cors())

app.get('/api/products', (req, res) => {
	res.send(data.products)
})

app.get('/api/products/id/:_id', (req, res) => {
	const product = data.products.find(x => x._id === req.params._id)
	if (product) {
		res.send(product)
	} else {
		res.status(404).send({ message: 'Product Not Found' })
	}
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`)
})
