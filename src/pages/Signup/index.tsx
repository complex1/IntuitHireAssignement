import SignupCardComponent from '../../components/signup/signupCard';
import styled from './signup.module.css';
const SignupPage = (): React.ReactElement => {
  return (
    <div className={styled.signup} >
      <div className={styled.signupLeft}>
        <img src='../../heroImage.jpg' alt='heroImage' className={styled.loginImg} />
      </div>
      <div className={styled.signupRight}>
        <SignupCardComponent />
      </div>
    </div>
  );
}

export default SignupPage;
