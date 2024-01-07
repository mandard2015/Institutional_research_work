import React from 'react';
import { Doughnut } from 'react-chartjs-2';
//import "bootstrap/dist/css/bootstrap.min.css";

import Search from './components/Search';
import Add from './components/Add';
import Delete from './components/Delete';
import Edit from './components/Edit';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App (){
  return(
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/add" element={<Add />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
 }

export default App;