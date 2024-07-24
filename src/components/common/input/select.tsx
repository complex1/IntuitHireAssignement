import React from 'react';
import styled from './input.module.css';

interface SelectComponentProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  label?: string;
  message?: string;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning';
  options: { value: string; label: string }[];
}

const SelectComponent = (props: SelectComponentProps) => {
  return (
    <fieldset
      className={`${styled.appInput} ${styled[props.variant || 'default']} ${props.disabled ? styled.disabled : ''}`}
    >
      <legend>{props.label}</legend>
      <select {...props}>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.message && <p>{props.message}</p>}
    </fieldset>
  );
};

export default SelectComponent;
