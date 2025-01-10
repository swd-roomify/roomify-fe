import './global.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RoutePath from './routes/RoutePath.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
                <RoutePath />
        </React.StrictMode>
)