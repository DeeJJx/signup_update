import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import Checkout from './pages/Checkout';
import OrderPreview from './pages/OrderPreview';
import OrderSuccess from './pages/OrderSuccess';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import ContactUs from './pages/ContactUs';
import CheckDomain from './pages/CheckDomain';
import AboutUs from './pages/AboutUs'


//templates
import Bricky from './components/templates/Bricky';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const {user} = useAuthContext();

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
              element={!user ? <Signup /> : <Navigate to="/dashboard" />}
              />
              <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
              path='/dashboard'
              element={user ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
              path='/templates/bricky'
              element={<Bricky />}
              />
              <Route
              path='/checkout'
              element={<Checkout />}
              />
              <Route
              path='/domain-search'
              element={<CheckDomain />}
              />
              <Route
              path='/order-success'
              // element={<OrderSuccess />}
              element={user ? <OrderSuccess /> : <Navigate to="/" />}
              />
              <Route
              path='/order-preview'
              element={<OrderPreview />}
              />
              <Route
              path='/privacy'
              element={<Privacy />}
              />
              <Route
              path='/terms'
              element={<Terms />}
              />
              <Route
              path='/sitemap'
              element={<Sitemap />}
              />
              <Route
              path='/contactus'
              element={<ContactUs />}
              />
              <Route
              path='/aboutus'
              element={<AboutUs />}
              />
              <Route
              path='/domain-search'
              element={<CheckDomain />}
              />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


// function App() {

//   const {user} = useAuthContext();

//   return (
//     <div className="App">
//       <BrowserRouter>
//       <Navbar />
//         <div className='pages'>
//           <Routes>
//               <Route 
//               path='/' 
//               element={<Home />}
//               />
//               <Route
//               path='/signup'
//               element={!user ? <Signup /> : <Navigate to="/dashboard" />}
//               />
//               <Route
//               path='/login'
//               element={!user ? <Login /> : <Navigate to="/dashboard" />}
//               />
//               <Route
//               path='/dashboard'
//               element={user ? <Dashboard /> : <Navigate to="/" />}
//               />
//               <Route
//               path='/order-success'
//               element={user ? <OrderSuccess /> : <Navigate to="/" />}
//               />
//           </Routes>
//         </div>
//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;