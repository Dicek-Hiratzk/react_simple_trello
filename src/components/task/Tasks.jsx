import React from "react";
import { Task } from "./Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (taskList, startIndex, endIndex) => {
  // タスクを並び変える sourceは移動元 destinationは移動先 spliceの引数2は○番目を削除
  const remove = taskList.splice(startIndex, 1); // [1,2,3] -> [2,3]
  // console.log(remove);
  taskList.splice(endIndex, 0, remove[0]); // [2,3] -> [2,1,3]
};

// TaskCard.jsxからpropsあり
export const Tasks = ({taskList, setTaskList}) => {
  const handleDragEnd = (result) => {
    // console.log(result);

    reorder(taskList, result.source.index, result.destination.index);

    setTaskList(taskList);
  };
  return (
    <div>
      <DragDropContext 
        onDragEnd={handleDragEnd} // ドラッグが終わった時に呼び出される関数
      >
        <Droppable droppableId="droppable">
          {/* Dragできる要素に変換 ※{(provided) => ()内*/}
          {(provided) => (
            <div 
              {...provided.droppableProps} // 必須項目(ライブラリ参照)
              ref={provided.innerRef} // Dragしているところ以外の制御
            >
              {taskList.map((task, index) => (
                <div key={task.id} // 取り出した要素にkeyを振る(map)
                >
                  <Task 
                    index={index} // taskListの配列の番号
                    task={task} 
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                </div>
              ))}
              {provided.placeholder}{/* 柔軟性をつけるため必要 */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
