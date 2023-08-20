import React from 'react'
import { Navbar } from './components/navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Signin from './components/signin/Signin'
import Footer from './components/footer/Footer'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/register" element={<Register/>}/>
        <Route  path="/signin" element={<Signin/>}/>
      </Routes>
      <Footer/>
      {/* <Route  path="/">
        <Home/>
      </Route>
      <Route  path="/register">
        <Register/>
      </Route>
      <Route  path="/signin">
        <Signin/>
      </Route> */}



      {/* <Navbar>
        <Route  path="/">
          <Home/>
        </Route>
        <Route  path="/register">
          <Register/>
        </Route>
        <Route  path="/signin">
          <Signin/>
        </Route>
      </Navbar> */}
      
    </div>
  )
}

export default App