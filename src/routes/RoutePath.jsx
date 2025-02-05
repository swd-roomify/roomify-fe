import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from '../pages/menu/MenuPage'
import Game from '../pages/gamePage/Game'
import JoinPage from '../pages/joinPage/JoinPage'

const RoutePath = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/game' element={<MenuPage/>}/>
            <Route path='/join' element={<JoinPage/>}/>
            <Route path='/demo' element={<Game/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RoutePath