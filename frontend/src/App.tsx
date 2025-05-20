import { Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import SubmitApplication from './pages/SubmitApplication'
//components
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/submitApplication" element={<SubmitApplication/>} />
      </Routes>
    </>
  )
}

export default App
