import React from "react";

export default function Button({ buttonName, onClickHandler, buttonIcon }) {
  return (
    <div>
      <button className="button" onClick={onClickHandler}>
        {buttonIcon}
        {buttonName}
      </button>
    </div>
  );
}
