import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import data from './data.js'
import orderRouter from './routes/orderRoutes.js'

dotenv.config()

try {
	mongoose.connect(process.env.MONGODB_URI)
	console.log('connected to db')
} catch (err) {
	console.log(err.message)
}

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/keys/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use('/api/seeds', seedRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`)
})

// mongoose
// 	.connect(process.env.MONGODB_URI)
// 	.then(() => {
// 		console.log('connected to db')
// 	})
// 	.catch(err => {
// 		console.log(err.message)
// 	})
