import React from 'react';
import "../css/Card.css"; // See the CSS below


const TerminalCard = ({ children }) => {
  return (
    <div className="card">
      <div className="tools">
        <div className="circle">
          <span className="red box"></span>
        </div>
        <div className="circle">
          <span className="yellow box"></span>
        </div>
        <div className="circle">
          <span className="green box"></span>
        </div>
      </div>
      <div className="cardContent">
        {children}
      </div>
    </div>
  );
};

export default TerminalCard;