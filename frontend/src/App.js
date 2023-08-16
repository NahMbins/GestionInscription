import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {React} from 'react';

/*import bootstrap*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

/*import route*/

import Inscription from './components/inscription';
import Home from './components/home';
import Liste from './components/liste';
import Inscrit from './components/inscrit';
import Chart from './components/chart';
import Login from './components/login';
import Calendrie from './components/calendar';
import Event from './components/envent';


import { ToastContainer } from 'react-toastify';

import { RequireToken } from './components/auth';





function App() {
  return (
    <div >
      
      <ToastContainer />
      
      <BrowserRouter>
        <Routes>            
          <Route path="/inscription" element={<Inscription/>} />
          <Route index element={<Home/>} />

          

          <Route path="/home" element={<Home/>} />
          <Route path="/auth" element={<Login/>} />
          <Route path="/liste"  element={<RequireToken><Liste/></RequireToken>}/>
          <Route path="/inscrit" element={<RequireToken><Inscrit/></RequireToken>} />
          <Route path="/inscrit/chart" element={<RequireToken><Chart/></RequireToken>} />
          <Route path='/calendar' element={<Calendrie/>} />
          <Route path='/event' element={<RequireToken><Event/></RequireToken>} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;