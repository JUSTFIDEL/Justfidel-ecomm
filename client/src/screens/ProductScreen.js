import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import authFetch from '../axios/custom'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Card from 'react-bootstrap/esm/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Rating from '../components/Rating'
import Button from 'react-bootstrap/esm/Button'
import { Helmet } from 'react-helmet-async'

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true }
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, product: action.payload }
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload }

		default:
			return state
	}
}

const ProductScreen = () => {
	const { _id } = useParams()

	const [{ product, error, loading }, dispatch] = useReducer(reducer, {
		product: [],
		error: '',
		loading: true,
	})

	const url = `/api/products/id/${_id}`

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' })
			try {
				const result = await authFetch(url)
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
			} catch (error) {
				dispatch({ type: 'FETCH_FAIL', payload: error.message })
			}
		}
		fetchData()
	}, [url])

	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<Row>
				<Col md={6}>
					<img
						className='img-large'
						src={product.image}
						alt={product.name}
					/>
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<Helmet>
								<title>{product.name}</title>
							</Helmet>
							<h1>{product.name}</h1>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								rating={product.rating}
								numReviews={product.numReviews}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price: N{product.price}</ListGroup.Item>
						<ListGroup.Item>
							<p>Description: {product.description}</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<Card.Body>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>N{product.price}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? (
												<Badge bg='success'>
													In Stock
												</Badge>
											) : (
												<Badge bg='danger'>
													Out of Stock
												</Badge>
											)}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<div className='d-grid'>
											<Button variant='success'>
												Add to Cart
											</Button>
										</div>
									</ListGroup.Item>
								)}
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default ProductScreen
