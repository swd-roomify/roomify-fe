import './global.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RoutePath from './routes/routePath.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
                <RoutePath />
        </React.StrictMode>
)