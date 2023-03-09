import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from './paginas/Home';
import Iph14 from './paginas/iph14';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/iph14" element={<Iph14 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
