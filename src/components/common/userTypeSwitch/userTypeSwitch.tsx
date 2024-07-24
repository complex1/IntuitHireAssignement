import React from "react";
import styles from './userTypeSwitch.module.css';
interface UserTypeSwitchProps {
  userType: string;
  setUserType: (userType: string) => void;
}
const UserTypeSwitch = (props: UserTypeSwitchProps): React.ReactElement => {
  const {userType, setUserType} = props;

  return (
    <div className={styles.userType} >
      <span onClick={() => setUserType('employer')} className={userType === 'employer' ? styles.userTypeActive : ''} >
        Employer
      </span>
      <span onClick={() => setUserType('freelancer')} className={userType === 'freelancer' ? styles.userTypeActive : ''} >
        Freelancer
      </span>
    </div>
  );
}

export default UserTypeSwitch;