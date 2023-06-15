import './App.css';
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

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


//templates
import Bricky from './components/templates/Bricky';

//components
import Navbar from './components/Navbar';
import StripeMessage from './components/StripeMessage';
import Footer from './components/Footer';

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);


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
              path='/templates/bricky'
              element={<Bricky />}
              />
              <Route
              path='/checkout'
              element={<Checkout />}
              />
              <Route
              path='/order-success'
              element={<OrderSuccess />}
              />
               {message ? (
                <StripeMessage message={message} />
               ) : (
                <Route
                path='/order-preview'
                element={<OrderPreview />}
                />
               )
               }
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



   
