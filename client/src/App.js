import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
// import Container from 'react-bootstrap/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
// import Navbar from 'react-bootstrap/Navbar'
// import { LinkContainer } from 'react-router-bootstrap'

function App() {
	return (
		<BrowserRouter>
			<div className='site-container'>
				<header>
					<Link to='/' className='logo_cont'>
						<img
							src='../favicon.png'
							alt='logo'
							className='logo_img'
						/>
						<p className='logo_text'>JustFidel</p>
					</Link>
				</header>

				<main className='pt-3'>
					<Routes>
						<Route path='/' element={<HomeScreen />} />
						<Route
							path='/product/:_id'
							element={<ProductScreen />}
						/>
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
