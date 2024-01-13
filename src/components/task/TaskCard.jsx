import React, { useState } from "react";
import { TaskCardTitle } from "./TaskCardTitle";
import { TaskCardDeleteButton } from "./button/TaskCardDeleteButton";
import { TaskAddInput } from "./input/TaskAddInput";
import { Tasks } from "./Tasks";
import { Draggable } from "react-beautiful-dnd";

export const TaskCard = ({
  taskCardsList, 
  setTaskCardsList, 
  taskCard,
  index,
}) => {
  const [inputText, setInputText] = useState("");
  const [taskList, setTaskList] = useState([]);
  return (
    <Draggable draggableId={taskCard.id} index={index}>
      {/* Dragできる要素に変換 ※{(provided) => ()内*/}
      {(provided) => (
        <div className="taskCard" 
          {...provided.draggableProps} // 必須項目(ライブラリ参照)
          ref={provided.innerRef}  // Dragしているところ以外の制御
        >
          <div className="taskCardTitleAndTaskCardDeleteButtonArea"
            {...provided.dragHandleProps} // 掴めるように
          >
            <TaskCardTitle />
            <TaskCardDeleteButton 
              taskCardsList={taskCardsList} 
              setTaskCardsList={setTaskCardsList}
              taskCard={taskCard}
            />
          </div>
          <TaskAddInput 
            inputText={inputText} 
            setInputText={setInputText}
            taskList={taskList}
            setTaskList={setTaskList}
          />
          <Tasks 
            inputText={inputText} 
            taskList={taskList} 
            setTaskList={setTaskList}
          />
        </div>
      )}
    </Draggable>
  );
};
