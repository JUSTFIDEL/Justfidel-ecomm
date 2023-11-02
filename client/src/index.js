import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import StoreContextProvider from './contexts/StoreContext'

const root = createRoot(document.getElementById('root'))
root.render(
	<StrictMode>
		<StoreContextProvider>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</StoreContextProvider>
	</StrictMode>,
)
