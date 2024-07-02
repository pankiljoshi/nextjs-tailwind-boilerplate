import React from "react";

const BouncingDotsLoader = ({ first, second, third }) => {
  return (
    <div className="bouncing-loader">
      <div className="selected-plan" style={{ backgroundColor: first }}></div>
      <div className="selected-plan" style={{ backgroundColor: second }}></div>
      <div className="selected-plan" style={{ backgroundColor: third }}></div>
    </div>
  );
};

export default BouncingDotsLoader;
