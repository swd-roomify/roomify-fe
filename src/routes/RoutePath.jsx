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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log(isLoggedIn);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isLoggedIn) {
      return <Navigate to="/menu" replace />;
    }
    return children;
  };

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

      </Routes>
    </BrowserRouter>
  );
};

export default RoutePath;
