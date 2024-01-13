import React from "react";
import { Draggable } from "react-beautiful-dnd";

// Tasks.jsxからpropsあり
export const Task = ({task, taskList, setTaskList, index}) => {
  const handleDelete = (id) => {
    // taskListの中身を変更(今回は削除:trueになるものだけ残す)
    setTaskList(taskList.filter((task) => task.id !== id));
  };
  return (
    <Draggable 
      index={index} 
      draggableId={task.draggableId} // どのDraggableか識別するためのID
    >
      {/* Dragできる要素に変換 ※{(provided) => ()内*/}
      {(provided) => (
        <div className="taskBox" 
          key={task.id} // 取り出した要素にkeyを振る(filter)
          ref={provided.innerRef} // Dragしているところ以外の制御
          {...provided.draggableProps} // 必須項目(ライブラリ参照)
          {...provided.dragHandleProps} // 要素を掴んで要素同士を入れ替え
        > 
          <p className="taskText">{task.text}</p>
          <button className="taskTrashButton"
            onClick={() => handleDelete(task.id)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      )}
    </Draggable>
  );
};
