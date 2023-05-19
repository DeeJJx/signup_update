import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';

//templates
import Bricky from './components/templates/Bricky';

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
              path='/templates'
              element={<Templates />}
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
              <Route
              path='/bricky'
              element={<Bricky />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
