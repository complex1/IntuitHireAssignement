
import CardComponent from '../../components/common/card/card';
import InputComponent from '../../components/common/input/input';
import ButtonComponent from '../../components/common/button/button';
import styles from './loginCard.module.css';
import UserTypeSwitch from '../common/userTypeSwitch/userTypeSwitch';
import { useState } from 'react';
import { getCompanies, getFreelancers } from '../../api/user';
const LoginCardComponent = () => {
  const [userType, setUserType] = useState('employer');
  const [formData, setFormData] = useState({
    username: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    }
  });

  const setValue = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: {
        value,
        error: ''
      }
    });
  }

  const login = async () => {
    let isValid = true;
    const newFormData = { ...formData };

    if (formData.username.value === '') {
      newFormData.username.error = 'Username is required';
      isValid = false;
    }

    if (formData.password.value === '') {
      newFormData.password.error = 'Password is required';
      isValid = false;
    }

    if (!isValid) {
      setFormData(newFormData);
    }

    if (!isValid) {
      return;
    }

    // login logic
    const username = formData.username.value;
    const password = formData.password.value;

    const userList = userType === 'employer' ? await getCompanies() : await getFreelancers();

    const user = userList.find((user: {
      email: string;
      password: string;
    }) => user.email === username && user.password === password);

    if (!user) {
      setFormData({
        username: {
          value: formData.username.value,
          error: 'Invalid username or password'
        },
        password: {
          value: formData.password.value,
          error: 'Invalid username or password'
        }
      });
    } else {
      localStorage.setItem(userType, JSON.stringify(user));
      if (userType === 'employer') {
        window.location.href = '/employer';
      } else {
        window.location.href = '/';
      }
    }
  }

  return <CardComponent width="400px" >
    <h1 className={styles.loginCard_title} >Login</h1>
    <UserTypeSwitch userType={userType} setUserType={setUserType}/>
    <InputComponent
      label="Username (Email)"
      placeholder="Username"
      value={formData.username.value}
      variant={formData.username.error ? 'danger' : 'default'}
      message={formData.username.error}
      onChange={(e) => setValue('username', e.target.value)}
      required
    />
    <InputComponent
      label='Password'
      placeholder="Password"
      value={formData.password.value}
      variant={formData.password.error ? 'danger' : 'default'}
      message={formData.password.error}
      onChange={(e) => setValue('password', e.target.value)}
      required
      type='password'
    />
    <div className='v-center space-between' >
      <InputComponent label="Remember Me" type="checkbox" />

      <a className={styles.loginCard_forgotPassword} href="/forgot-password">Forgot Password?</a>
    </div>
    <div className="v-center space-between mt-4">
      <a className={styles.loginCard_forgotPassword} href="/signup">Register</a>

      <ButtonComponent variant="primary" onClick={login}>
        Login
      </ButtonComponent>
    </div>
  </CardComponent>
}

export default LoginCardComponent;