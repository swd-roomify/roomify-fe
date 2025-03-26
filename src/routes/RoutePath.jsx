import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePageContainer from '@/pages/homepage/HomePageContainer';
import NewHomePage from '@/pages/homepage/NewHomePage';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import UserRoomList from '@/pages/userRoom/UserRoomList';
import MenuPage from '@/pages/menu/MenuPage';
import JoinPage from '@/pages/joinPage/JoinPage';
import Game from '@/pages/gamePage/Game';
import OAuth2Success from '@/utils/OAuth2Success';

const RoutePath = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewHomePage />}>
          <Route index element={<HomePageContainer />} />  
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='room' element={<UserRoomList />} />
          <Route path='menu' element={<MenuPage />} />
        </Route>
        <Route path='join' element={<JoinPage />} />
        <Route path='play' element={<Game />} />
        <Route path="/api/auth/oauth2/success" element={<OAuth2Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePath;
