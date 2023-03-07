import React, { useState } from 'react'
import SignUpForm from '../../components/signup_form'
import Login from '../../components/login_form'
import './index.css';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);

  const handleButtonClick = () => {
    setIsSignup(isSignup ? false : true);
  }

  return (
    <section className="auth-page">
      <div>
      <div className="login-container">
        <div className='signIn-title'>Daily ToDo's</div> 
        <div className="login-button" onClick={handleButtonClick}>{isSignup ? "Login" : "Sign up"}</div>
      </div>

      {isSignup ?
      <SignUpForm />
      :
      <Login />
      }
      </div>
    </section>
  )
}

export default Auth