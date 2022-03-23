import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import PizzaOrder from "./components/PizzaOrder";
import CancelOrder from './components/CancelOrder';



function App() {

  return (
    <div className="App">
        <Routes>
          <Route path = "/"  element = {<Login />} exact/>
          <Route path="/pizzaOrder" element = {<PizzaOrder />} />
          <Route path="/cancelOrder" element = {<CancelOrder />} />
        </Routes>
    </div>
  );
}


export default App;
