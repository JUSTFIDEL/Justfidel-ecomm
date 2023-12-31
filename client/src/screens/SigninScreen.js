import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Helmet } from 'react-helmet-async'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../contexts/StoreContext'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import axios from 'axios'
// import Axios from 'axios'

function SigninScreen() {
	const navigate = useNavigate()
	const { search } = useLocation()
	const redirectInUrl = new URLSearchParams(search).get('redirect')
	const redirect = redirectInUrl ? redirectInUrl : '/'

	const url = 'https://justfidel-ecomm-api.vercel.app/api/users/signin'
	const { state, dispatch } = useContext(StoreContext)
	const { userInfo } = state

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submitHandler = async e => {
		e.preventDefault()

		try {
			const { data } = await axios.post(url, { email, password })
			dispatch({ type: 'USER_SIGNIN', payload: data })
			localStorage.setItem('userInfo', JSON.stringify(data))
			navigate(redirect || '/')
		} catch (err) {
			toast.error(getError(err))
		}
	}

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [userInfo, redirect, navigate])

	return (
		<Container className='small-container'>
			<Helmet>
				<title>Sign In</title>
			</Helmet>
			<h1 className='my-3'>Sign In</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						required
						onChange={e => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						required
						onChange={e => setPassword(e.target.value)}
					/>
				</Form.Group>
				<div className='mb-3'>
					<Button type='submit' variant='success'>
						Sign In
					</Button>
				</div>
				<div className='mb-3'>
					New customer?{' '}
					<Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
				</div>
			</Form>
		</Container>
	)
}

export default SigninScreen
