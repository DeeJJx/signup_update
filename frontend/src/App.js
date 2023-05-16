import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

//components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
              <Route 
              path='/' 
              element={<Home />}
              />
              <Route
              path='/signup'
              element={<Signup />}
              />
              <Route
              path='/login'
              element={<Login />}
              />
              <Route
              path='/dashboard'
              element={<Dashboard />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
