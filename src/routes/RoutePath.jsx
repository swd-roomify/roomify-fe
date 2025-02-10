import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuPage from '../pages/menu/MenuPage'
import Game from '../pages/gamePage/Game'
import SignIn from '../pages/auth/SignIn'
import Login from '../pages/auth/Login'
import NewHomePage from '@/pages/homepage/NewHomePage'
import JoinPage from '../pages/joinPage/JoinPage'
import SignUp from '../pages/auth/SignUp'
import ListRoom from '../components/listRoom/ListRoom'
import UserRoomList from '@/pages/userRoom/UserRoomList'

const RoutePath = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewHomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/demo' element={<Game />} />
        <Route path='/game' element={<MenuPage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/room' element={<UserRoomList />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutePath