import React from 'react';
import styled from './button.module.css';

interface ButtonProps {
  children?: React.ReactNode | string;
  onClick: () => void;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning';
  disabled?: boolean;
}

const ButtonComponent = ({
  children,
  onClick,
  variant,
  disabled,
}: ButtonProps ): React.ReactElement => {
  return (
    <button className={`${styled.appButton} ${
      styled[variant || 'default']
    } ${disabled ? styled.disabled : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
