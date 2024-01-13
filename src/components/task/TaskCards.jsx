import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskCardButton } from "./button/AddTaskCardButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (taskCardsList, startIndex, endIndex) => {
  // タスクを並び変える sourceは移動元 destinationは移動先 spliceの引数2は○番目を削除
  const remove = taskCardsList.splice(startIndex, 1); // [1,2,3] -> [2,3]
  // console.log(remove);
  taskCardsList.splice(endIndex, 0, remove[0]); // [2,3] -> [2,1,3]
};

export const TaskCards = () => {
  // taskCardを増やすための配列保存
  const [taskCardsList, setTaskCardsList] = useState([
    {
      id: "0",
      draggableId: "item0",
    }
  ]);

  const handleDragEnd = (result) => {
    reorder(taskCardsList, result.source.index, result.destination.index);

    setTaskCardsList(taskCardsList);
  }; 

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal"> 
      {/* horizontalは水平移動用 */}
        {/* Dragできる要素に変換 ※{(provided) => ()内*/}
        {(provided) => (
          <div className="taskCarsArea" 
            {...provided.dorppableProps} // 必須項目(ライブラリ参照)
            ref={provided.innerRef} // Dragしているところ以外の制御
          >
            {/* taskCardを取り出す */}
            {taskCardsList.map((taskCard, index) =>(
              <TaskCard 
                key={taskCard.id}
                index={index}
                taskCardsList={taskCardsList}
                setTaskCardsList={setTaskCardsList}
                taskCard={taskCard}
              />
            ))}
            {provided.placeholder}
            <AddTaskCardButton 
              taskCardsList={taskCardsList}
              setTaskCardsList={setTaskCardsList}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
