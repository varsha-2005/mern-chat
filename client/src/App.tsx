import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./Outlet/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Context from "./Context";
import Main from "./pages/Main";

function App() {

  return (
    <Context>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Layout />} >
              <Route path="main" element={<Main /> } />
          </Route>
        </Routes>
      </Router>
    </Context>
  )
}

export default App
