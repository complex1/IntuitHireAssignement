import React from 'react';
import styled from './login.module.css';
import LoginCardComponent from '../../components/login/loginCard';

const LoginPage = (): React.ReactElement => {
  return (
    <div className={styled.login} >
      <div className={styled.loginLeft}>
        <img src='../../heroImage.jpg' alt='heroImage' className={styled.loginImg} />
      </div>
      <div className={styled.loginRight}>
        <LoginCardComponent />
      </div>
    </div>
  );
};

export default LoginPage;