import ButtonComponent from '../button/button';
import styled from './header.module.css';
const HeaderComponent = () => {
  const logout = () => {
    localStorage.removeItem('employer');
    localStorage.removeItem('freelancer');
    window.location.href = '/login';
  }
  return (
    <header className={styled.header} >
      <h1 className='v-center' >
        <img src="/intuit.png" alt="Intuit Logo" width={40} />
        INTUIT HIRE
      </h1>
      <ButtonComponent variant='secondary' onClick={logout} >Logout</ButtonComponent>
    </header>
  );
}

export default HeaderComponent;