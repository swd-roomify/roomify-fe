import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePageContainer from '@/pages/homepage/HomePageContainer';
import NewHomePage from '@/pages/homepage/NewHomePage';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import UserRoomList from '@/pages/userRoom/UserRoomList';
import MenuPage from '@/pages/menu/MenuPage';
import JoinPage from '@/pages/joinPage/JoinPage';
import Game from '@/pages/gamePage/Game';
import OAuth2Success from '@/utils/OAuth2Success';
import { isTokenValid } from '@/utils/AuthUtil';
import Profile from '@/pages/profile/profilePage';

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expiration');
    return <Navigate to="/signin" replace />;
  }
  return children;
};

const RoutePath = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewHomePage />}>
          <Route index element={<HomePageContainer />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='room' element={<ProtectedRoute><UserRoomList /></ProtectedRoute>} />
          <Route path='menu' element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
          <Route path='profile' element={<Profile/>} />
        </Route>
        <Route path='join' element={<ProtectedRoute><JoinPage /></ProtectedRoute>} />
        <Route path='play' element={<ProtectedRoute><Game /></ProtectedRoute>} />

        <Route path="/api/auth/oauth2/success" element={<OAuth2Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePath;
