import React from "react";
import { Draggable } from "react-beautiful-dnd";
import EditTaskBtn from "./EditTaskBtn";

export default function Task(props) {
  return (
    <Draggable key={props.itemId} draggableId={props.itemId} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: 16,
              border: '1px solid lightblue',
              borderRadius: '3px',
              margin: '0 0 8px 0',
              backgroundColor: snapshot.isDragging ? '#F8F8FF' : '#ADD8E6',
              color: '#2F4F4F',
              fontSize: 16,
              ...provided.draggableProps.style
            }}
          >
            <EditTaskBtn setColumns={props.setColumns} columnId={props.columnId} taskId={props.itemId} taskBody={props.itemBody}/>
          </div>
        )
      }}
    </Draggable>
  )
}