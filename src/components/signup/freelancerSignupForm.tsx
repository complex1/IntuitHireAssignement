import { forwardRef, useImperativeHandle, useState } from "react";
import InputComponent from "../common/input/input";
export interface FreelancerSignupFormRef {
  validate: () => boolean;
  formData: {
    fullName: string;
    githubUsername: string;
    email: string;
    contactNumber: string;
    password: string;
  }
}
const FreelancerSignupForm = forwardRef((_, ref: React.Ref<FreelancerSignupFormRef>) => {
  const [formData, setFormData] = useState({
    fullName: {
      value: '',
      error: ''
    },
    githubUsername: {
      value: '',
      error: ''
    },
    email: {
      value: '',
      error: ''
    },
    contactNumber: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    },
    confirmPassword: {
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

  const validate = () => {
    let isValid = true;
    const newFormData = { ...formData };

    if (formData.fullName.value === '') {
      newFormData.fullName.error = 'Full Name is required';
      isValid = false;
    }

    if (formData.githubUsername.value === '') {
      newFormData.githubUsername.error = 'Github Username is required';
      isValid = false;
    }

    if (formData.email.value === '') {
      newFormData.email.error = 'Email is required';
      isValid = false;
    }

    if (formData.email.value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.value)) {
      newFormData.email.error = 'Email is not valid';
      isValid = false
    }

    if (formData.contactNumber.value === '') {
      newFormData.contactNumber.error = 'Contact Number is required';
      isValid = false;
    }

    if (formData.contactNumber.value !== '' && !/^\d{10}$/.test(formData.contactNumber.value)) {
      newFormData.contactNumber.error = 'Contact Number is not valid';
      isValid = false;
    }

    if (formData.password.value === '') {
      newFormData.password.error = 'Password is required';
      isValid = false;
    }

    if (formData.confirmPassword.value === '') {
      newFormData.confirmPassword.error = 'Confirm Password is required';
      isValid = false;
    }

    if (formData.password.value !== formData.confirmPassword.value) {
      newFormData.confirmPassword.error = 'Password and Confirm Password should be same';
      isValid = false;
    }

    setFormData(newFormData);
    return isValid;
  }

  useImperativeHandle(ref, () => ({
    validate,
    formData: {
      fullName: formData.fullName.value,
      githubUsername: formData.githubUsername.value,
      email: formData.email.value,
      contactNumber: formData.contactNumber.value,
      password: formData.password.value
    } as FreelancerSignupFormRef['formData']
  }));

  return (
    <>
      <InputComponent
        label="Full Name"
        placeholder="Full Name"
        value={formData.fullName.value}
        onChange={(e) => setValue('fullName', e.target.value)}
        variant={formData.fullName.error ? 'danger' : 'default'}
        message={formData.fullName.error}
        required
      />
      <InputComponent
        label="Github Username"
        placeholder="Github Username"
        value={formData.githubUsername.value}
        onChange={(e) => setValue('githubUsername', e.target.value)}
        variant={formData.githubUsername.error ? 'danger' : 'default'}
        message={formData.githubUsername.error}
        required
      />
      <InputComponent
        label="Email (Username)"
        placeholder="Email"
        value={formData.email.value}
        onChange={(e) => setValue('email', e.target.value)}
        variant={formData.email.error ? 'danger' : 'default'}
        message={formData.email.error}
        required
      />
      <InputComponent
        label="Contact Number"
        placeholder="Contact Number"
        value={formData.contactNumber.value}
        onChange={(e) => setValue('contactNumber', e.target.value)}
        variant={formData.contactNumber.error ? 'danger' : 'default'}
        message={formData.contactNumber.error}
        required
      />
      <InputComponent
        label='Password'
        placeholder="Password"
        value={formData.password.value}
        onChange={(e) => setValue('password', e.target.value)}
        variant={formData.password.error ? 'danger' : 'default'}
        message={formData.password.error}
        required
      />
      <InputComponent
        label='Confirm Password'
        placeholder="Confirm Password"
        value={formData.confirmPassword.value}
        onChange={(e) => setValue('confirmPassword', e.target.value)}
        variant={formData.confirmPassword.error ? 'danger' : 'default'}
        message={formData.confirmPassword.error}
        required
      />
    </>
  );
})

export default FreelancerSignupForm;