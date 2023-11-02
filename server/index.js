import express from 'express'
import cors from 'cors'
import data from './data.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'

dotenv.config()

// mongoose
// 	.connect(process.env.MONGODB_URI)
// 	.then(() => {
// 		console.log('connected to db')
// 	})
// 	.catch(err => {
// 		console.log(err.message)
// 	})

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

app.use('/api/seeds', seedRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`)
})
