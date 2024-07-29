import React from 'react';
import stylus from './card.module.css';
const CardComponent = ({ children, width, height }: { children?: React.ReactNode, width?: string, height?: string }) => {
  return (
    <div className={stylus.appCard} style={{
      width: width,
      height: height
    }}  >
      {children}
    </div>
  );
}

export default CardComponent;