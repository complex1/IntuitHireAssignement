import React from 'react';
import stylus from './card.module.css';
const CardComponent = ({ children, width }: { children?: React.ReactNode, width?: string }) => {
  return (
    <div className={stylus.appCard} style={{
      width: width
    }}  >
      {children}
    </div>
  );
}

export default CardComponent;