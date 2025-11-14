import { BrowserRouter as Router, Routes, Route ,useLocation} from 'react-router-dom';
import Home from './components/Home';
import SingleRecipe from './components/SingleRecipe';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Allrecipes from './components/Allrecipes';
import Carousel from './components/Carousel';
import AboutSection from './components/AboutSection';


export default function App() {
  return (
    <>
      <Router>
        <HeaderWrapper/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/caro' element={<Carousel/>}/>
          <Route path='/recipes/:title?' element={<Allrecipes/>}/>
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/about" element={<AboutSection/>} />
        </Routes>
      </Router>
    </>
  )
}
function HeaderWrapper(){
  const location=useLocation();
   return location.pathname !== '/login' && location.pathname !== '/register' && <Header/>
}