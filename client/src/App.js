import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Container from 'react-bootstrap/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
// import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
// import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react'
import { StoreContext } from './contexts/StoreContext'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'

function App() {
	const { state, dispatch } = useContext(StoreContext)
	const { cart, userInfo } = state

	const signoutHandler = () => {
		dispatch({ type: 'USER_SIGNOUT' })
		localStorage.removeItem('userInfo')
	}

	return (
		<BrowserRouter>
			<div className='site-container'>
				<ToastContainer position='bottom-center' limit={1} />
				<header>
					<Link to='/' className='logo_cont'>
						<img src='../favicon.png' alt='logo' className='logo_img' />
						<p className='logo_text'>JustFidel</p>
					</Link>
					<div className='nav_profile'>
						<Link to='/cart' className='nav-link'>
							<i className='fa-solid fa-cart-shopping fa-beat i-color'>
								{cart.cartItems.length > 0 && (
									<Badge pill bg='danger'>
										{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
									</Badge>
								)}
							</i>
						</Link>
						{userInfo ? (
							<NavDropdown
								title={userInfo.name}
								id='basic-nav-dropdown'
								className='user_pro'
							>
								<LinkContainer to='/profile'>
									<NavDropdown.Item>User Profile</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to='/orderhistory'>
									<NavDropdown.Item>Order History</NavDropdown.Item>
								</LinkContainer>

								<NavDropdown.Divider />

								<Link
									className='dropdown-item'
									to='#signout'
									onClick={signoutHandler}
								>
									Sign Out{' '}
								</Link>
							</NavDropdown>
						) : (
							<Link className='nav-link' to='/signin'>
								Sign In
							</Link>
						)}
					</div>
				</header>
				{/* <header>
					<Navbar>
						<Container>
						<LinkContainer to='/'>
							<Navbar.Brand>
								<img
									src='../favicon.png'
									alt='logo'
									className='logo_img'
								/>
								JustFidel
							</Navbar.Brand>
						</LinkContainer>
						<nav className='me-auto'>
							<Link to='/cart' className='nav-link'>
								Cart
								{cart.cartItems.length > 0 && (
									<Badge pill bg='danger'>
										{cart.cartItems.length}
									</Badge>
								)}
							</Link>
						</nav>
						</Container>
					</Navbar>
				</header> */}

				<main className='pt-3'>
					<Routes>
						<Route path='/' element={<HomeScreen />} />
						<Route path='/product/:_id' element={<ProductScreen />} />
						<Route path='/cart' element={<CartScreen />} />
						<Route path='/signin' element={<SigninScreen />} />
					</Routes>
				</main>

				<footer>
					<div>{`All rights reserved - JustFidel ©${new Date().getFullYear()}`}</div>
				</footer>
			</div>
		</BrowserRouter>
	)
}

export default App
