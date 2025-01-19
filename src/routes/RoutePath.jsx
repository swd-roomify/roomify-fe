import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from '../pages/gamePage/Game'
import MenuPage from '../pages/menu/MenuPage'

const RoutePath = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MenuPage/>}/>
            <Route path='/demo' element={<Game/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RoutePath