import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from './Rating'

const Products = ({ product }) => {
	return (
		<Card>
			<Link to={`/product/${product._id}`}>
				<img
					src={product.image}
					alt={product.name}
					className='card-img-top'
				/>
			</Link>
			<Card.Body className='product-info'>
				<Link to={`/product/${product._id}`}>
					<Card.Title className='c_tit'>{product.name} </Card.Title>
				</Link>
				<Rating
					rating={product.rating}
					numReviews={product.numReviews}
				/>
				<Card.Text>N{product.price}</Card.Text>
				<Button variant='success'>Add to cart</Button>
			</Card.Body>
		</Card>
	)
}

export default Products
