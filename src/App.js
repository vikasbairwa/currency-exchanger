import React from 'react'
import './App.css';
import Home from './pages/Home';
import Signin from './pages/Signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin />} />
      </Routes>
    </Router>
    </>
  )
  
}

export default App;
