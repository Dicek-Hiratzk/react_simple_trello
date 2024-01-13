import React from "react";
import { v4 as uuid } from "uuid";

// TaskCard.jsxからpropsあり
export const TaskAddInput = ({
  inputText, 
  setInputText,
  taskList, 
  setTaskList
}) => {
  const handleSubmit = (e) => {
    const taskId = uuid(); // ユニークなIDを生成することでバグ対策(削除・追加後のタスクの挙動)
    e.preventDefault();
    // console.log(e);
    // 空のタスクを入れないようにする
    if (inputText === "") {
      return;
    };
    // カードを追加する
    setTaskList([
      ...taskList, // 元の配列の中身（スプレッド構文）
      {
        id: taskId, // タスクの識別子
        draggableId: `task-${taskId}`,
        text: inputText,
      },
    ]);
    // console.log(...taskList);
    // console.log(inputText);
    setInputText(""); // 追加後に欄を空にする
  };

  // フォーム入力でinputTextの内容を更新
  const handleChange = (e) => {
    setInputText(e.target.value);
    // console.log(inputText);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="taskAddInput" 
          type="text" 
          placeholder="add a task" 
          onChange={handleChange}
          // タスク追加後に欄を空にするのを読み取る
          value={inputText}
        />
      </form>
    </div>
  );
};
