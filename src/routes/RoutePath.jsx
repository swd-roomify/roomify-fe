import NewHomePage from '@/pages/homepage/NewHomePage'
import UserRoomList from '@/pages/userRoom/UserRoomList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import Game from '../pages/gamePage/Game'
import JoinPage from '../pages/joinPage/JoinPage'
import MenuPage from '../pages/menu/MenuPage'
import OAuth2Success from '@/utils/OAuth2Success'

const RoutePath = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewHomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/room' element={<UserRoomList />}/>

        <Route path='/menu' element={<MenuPage />} />

        <Route path='/join' element={<JoinPage />} />
        <Route path='/play' element={<Game />} />
        <Route path="/api/auth/oauth2/success" element={<OAuth2Success />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutePath