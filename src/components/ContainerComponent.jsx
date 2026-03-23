import React from 'react';
import "../css/Background.css";

const ContainerComponent = ({children}) => {
  return (
    /* From Uiverse.io by kandalgaonkarshubham */
    <div className="dark-circuit-wrapper">
      {/* Content goes here */}
      {children}
    </div>
  );
};

export default ContainerComponent;