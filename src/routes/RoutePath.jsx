import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from '../pages/menu/MenuPage'
import Game from '../pages/gamePage/Game'
// import HomePage from '../pages/homepage/HomePage'
import SignIn from '../pages/auth/SignIn'
import NewHomePage from '@/pages/homepage/NewHomePage'

const RoutePath = () => {
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<HomePage/>}/> */}
          <Route path='/' element={<NewHomePage/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/room' element={<MenuPage/>}/>
          <Route path='/demo' element={<Game/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RoutePath