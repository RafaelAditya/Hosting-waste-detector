import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/Login/LoginForm';
import SignUpForm from './Components/SignUp/SignUpForm.jsx';
import ForgotPassword from './Components/Forgot/ForgotPass.jsx';
import Dashboard from './Components/Homepage/Dashboard.jsx';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<SignUpForm />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/home' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App