import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"

import Landing from "pages/landing"
import Invest from "pages/Invest"
import Detail from "pages/Detail"
import Earn from "pages/Earn"

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
            <Route path="/mint" element={<TopNav />} />
            <Route path="/detail" element={<TopNav />} />
            <Route path="/earn" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/mint" element={<Invest />} />
          <Route exact path="/detail" element={<Detail />} />
          <Route exact path="/earn" element={<Earn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
