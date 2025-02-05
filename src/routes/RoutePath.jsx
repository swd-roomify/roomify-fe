import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from '../pages/menu/MenuPage'
import Game from '../pages/gamePage/Game'
import SignIn from '../pages/auth/SignIn'
import NewHomePage from '@/pages/homepage/NewHomePage'
import JoinPage from '../pages/joinPage/JoinPage'

const RoutePath = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<NewHomePage/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/demo' element={<Game/>}/>
            <Route path='/game' element={<MenuPage/>}/>
            <Route path='/join' element={<JoinPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RoutePath