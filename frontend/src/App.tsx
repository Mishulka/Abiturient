import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import SubmitApplication from './pages/SubmitApplication'
import MyApplications from './pages/MyApplications'
import Profile from './pages/Profile'
//components
import Navbar from './components/Navbar/Navbar'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import RegisterPage from './pages/RegisterPage'


function App() {

  return (
    <>
      <Navbar />
      <div id='main'>
      <Routes>
        <Route path="/" element={
          <PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/myApps" element={
          <PrivateRoute><MyApplications /></PrivateRoute>
        } />
        <Route path="/submitApplication" element={
          <PrivateRoute><SubmitApplication/></PrivateRoute>} />
          <Route path="/profile" element={
          <PrivateRoute><Profile/></PrivateRoute>} />
      </Routes>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
