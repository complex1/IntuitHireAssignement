import React from "react";
import ButtonComponent from "../common/button/button";
import CardComponent from "../common/card/card";
import UserTypeSwitch from "../common/userTypeSwitch/userTypeSwitch";
import EmployerSignupForm, { EmployerSignupFormRef } from "./employerSIgnupForm";
import FreelancerSignupForm, { FreelancerSignupFormRef } from "./freelancerSignupForm";
import { useNavigate } from "react-router";
import { addCompany, addFreelancer } from "../../api/user";

const SignupCardComponent = (): React.ReactElement => {

  const [userType, setUserType] = React.useState('employer');
  const employerSignupFormRef = React.useRef<EmployerSignupFormRef>(null);
  const freelancerSignupFormRef = React.useRef<FreelancerSignupFormRef>(null);
  const navigate = useNavigate();

  const goToLogin = () => {
    const url = '/login';
    navigate(url);
  }

  const onSubmit = async () => {
    try {
      if (userType === 'employer' && employerSignupFormRef.current !== null) {
        if (employerSignupFormRef.current.validate()) {
          const formData = employerSignupFormRef.current.formData;
          await addCompany(formData);
        }
      } else if (userType === 'freelancer' && freelancerSignupFormRef.current !== null) {
        if (freelancerSignupFormRef.current.validate()) {
          const formData = freelancerSignupFormRef.current.formData;
          await addFreelancer(formData);
        }
      }
      goToLogin();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <CardComponent width="400px" >
      <h1>Signup</h1>
      <UserTypeSwitch userType={userType} setUserType={setUserType} />
      {
        userType === 'employer' ?
          <EmployerSignupForm ref={employerSignupFormRef} /> :
          <FreelancerSignupForm ref={freelancerSignupFormRef} />
      }

      <div className="v-center space-between mt-4">
        <ButtonComponent onClick={goToLogin}>
          Signin
        </ButtonComponent>
        <ButtonComponent variant="primary" onClick={onSubmit}>
          Signup
        </ButtonComponent>
      </div>
    </CardComponent>
  );
}

export default SignupCardComponent;