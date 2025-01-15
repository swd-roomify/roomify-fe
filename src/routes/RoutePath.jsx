import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from '../components/menu/MenuPage'
import App from '../App'
import Game from '../pages/gamePage/Game'

const RoutePath = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MenuPage/>}/>
            <Route path='/game' element={<App/>}/>
            <Route path='/demo' element={<Game/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RoutePath