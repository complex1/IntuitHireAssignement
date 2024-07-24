import { forwardRef, useImperativeHandle, useState } from "react";
import InputComponent from "../common/input/input";

export interface EmployerSignupFormRef {
  validate: () => boolean;
  formData: {
    companyName: string;
    email: string;
    contactNumber: string;
    password: string;
  }
}

const EmployerSignupForm = forwardRef((_props: unknown, ref: React.Ref<EmployerSignupFormRef>) => {
  const [formData, setFormData] = useState({
    companyName: {
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

    if (formData.companyName.value === '') {
      newFormData.companyName.error = 'Company Name is required';
      isValid = false;
    }

    if (formData.email.value === '') {
      newFormData.email.error = 'Email is required';
      isValid = false;
    }

    if (!formData.email.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newFormData.email.error = 'Invalid Email';
      isValid = false;
    }

    if (formData.contactNumber.value === '') {
      newFormData.contactNumber.error = 'Contact Number is required';
      isValid = false;
    }

    if (!formData.contactNumber.value.match(/^\d{10}$/)) {
      newFormData.contactNumber.error = 'Invalid Contact Number';
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
      companyName: formData.companyName.value,
      email: formData.email.value,
      contactNumber: formData.contactNumber.value,
      password: formData.password.value
    } as EmployerSignupFormRef['formData']
  }));

  return (
    <>
      <InputComponent
        label="Company Name"
        placeholder="Company Name"
        value={formData.companyName.value}
        onChange={(e) => setValue('companyName', e.target.value)}
        variant={formData.companyName.error ? 'danger' : 'default'}
        message={formData.companyName.error}
        required
      />
      <InputComponent
        label="Email"
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

export default EmployerSignupForm;