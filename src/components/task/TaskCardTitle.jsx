import React, { useState } from "react";

export const TaskCardTitle = () => {
  const [isClick, setIsClick] = useState(false);
  const [inputCardTitle, setInputCardTitle] = useState("Today");

  const handleClick = () => {
    setIsClick(true);
    // console.log(isClick);
  };

  const handleChange = (e) => {
    // console.log(inputCardTitle);
    setInputCardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ページ更新予防
    setIsClick(false);
  };

  // inputタグからマウスが外れても呼び出されるプロパティ
  const handleBlur = () => {
    setIsClick(false);
  };

  return (
    <div className="taskCardTitleInputArea" 
      onClick={handleClick}
    >
      {isClick ? 
        <form onSubmit={handleSubmit}>
          <input className="taskCardTitleInput"
            type="text" 
            autoFocus
            maxLength="10"
            onChange={handleChange} 
            onBlur={handleBlur}
            value={inputCardTitle}
          />
        </form> 
        : 
        <h3>{inputCardTitle}</h3>
      }
    </div>
  );
};
