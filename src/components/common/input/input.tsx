import React from 'react';
import styled from './input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  value?: string;
  label?: string;
  message?: string;
  required?: boolean;
  isTextArea?: boolean;
  variant?:
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning';
}

const InputComponent = (props: InputProps) => {
  if (props.type === 'checkbox') {
    return (
      <div
        className={`${styled.appCheckbox} ${styled[props.variant || 'default']
          } ${props.disabled ? styled.disabled : ''}`}
      >
        <input {...props} />
        <label>{props.label}</label>
        {props.message && <p>{props.message}</p>}
      </div>
    );
  }

  return (
    <>
      <fieldset
        className={`${styled.appInput} ${styled[props.variant || 'default']} ${props.disabled ? styled.disabled : ''
          }`}
      >
        <legend>{props.label}
          {props.required && <span className={styled.required}>*</span>}
        </legend>
        {props.isTextArea ? <textarea {...props} /> : <input {...props} />}
      </fieldset>
      {props.message && <p className={`${styled.appInputMessage} ${styled[props.variant || 'default']}`} >{props.message}</p>}
    </>
  );
};

export default InputComponent;
