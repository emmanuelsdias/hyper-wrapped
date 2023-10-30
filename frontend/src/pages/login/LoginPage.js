import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './style.css';
import logoSymbol from '../../images/double_symbol.svg';
import sadRobot from '../../images/sad_robot.jpg';
import { login } from '../../store';
import { loginWithUsername } from '../../api/loginWithUsername';

function HomePage() {
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const [loginErrorBool, setLoginErrorBool] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const selectLogin = () => {
    setIsLoginSelected(true);
  };

  const selectSignup = () => {
    setIsLoginSelected(false);
  }

  const setLoginError = (error, text) => {
    setLoginErrorBool(error);
    setLoginErrorText(text);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);

    const response = await loginWithUsername(username);

    if (response) {
      if (response.username) {
        const userInfo = {
          username: response.username,
          firstName: response.first_name,
          lastName: response.last_name,
          userId: response.user_id
        }
        dispatch(login(userInfo));
      } else {
        setLoading(false);
        setLoginError(true, 'Invalid username or password.');
      }
    } else {
      setLoading(false);
      setLoginError(true, 'No response from server.');
    }

  };

  const isLogged = useSelector(state => state.isLogged);

  if (isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div id='login-page'>
      <div className='card'>
        <div className='logo'>
          <img src={logoSymbol} alt='hyperplane logo' />
        </div>
        <div className='title-holder'>
          <div className={`title login ${isLoginSelected ? '' : 'hidden'}`}>
            enter your account
          </div>
          <div className={`title signup ${isLoginSelected ? 'hidden' : ''}`}>
            register new account
          </div>
        </div>
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            defaultChecked={isLoginSelected}
            onChange={selectLogin}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            defaultChecked={!isLoginSelected}
            onChange={selectSignup}
          />
          <label htmlFor="login" className="login">login</label>
          <label htmlFor="signup" className="signup">register</label>
          <div className="slider"></div>
        </div>
        <div className='form-inner'>
          <form className={`login-form ${isLoginSelected ? '' : 'hidden'}`} onSubmit={handleLogin}>
            <div className='field'>
              <input
                type='text'
                placeholder='username'
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className='field'>
              <input
                type='password'
                placeholder='password'
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className={`loginError ${loginErrorBool ? '' : 'hidden'}`}>
              <p id='loginErrorText'>{loginErrorText}</p>
            </div>
            <div className='field button'>
              <div className="button-fill"></div>
              <input type='submit' value={loading ? 'loading...' : 'enter'} />
            </div>
          </form>
          <form className={`signup-form ${isLoginSelected ? 'hidden' : ''}`}>
            <h3>Sorry, currently you may not register a new user.</h3>
            <img src={sadRobot} style={{ height: '80px', margin: '-5px auto' }} alt='sad robot' />
            <p>Please contact an administrator if you believe this is an error.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
