import { Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import SubmitApplication from './pages/SubmitApplication'
import ProfilePage from './pages/ProfilePge'
//components
import Navbar from './components/Navbar'
import './App.css'
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <PrivateRoute><ProfilePage /></PrivateRoute>
        } />
        <Route path="/submitApplication" element={
          <PrivateRoute><SubmitApplication/></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
