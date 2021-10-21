import React from "react";
import AddTaskBtn from "./AddTaskBtn";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import styled from "styled-components";
import EditColumnBtn from "./EditColumnBtn";

export default function Column(props) {
  return (
    <Draggable key={props.column.id} draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div key={props.id} 
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="column-container"
        >
          <div style={{width: 250}} 
          {...provided.dragHandleProps}>
            <EditColumnBtn columnId={props.column.id} columnTitle={props.column.title} setColumns={props.setColumns}/>
            <AddTaskBtn columnId={props.column.id} setColumns={props.setColumns}/>
          </div>
            <Droppable droppableId={props.id} type="task">
              {(provided, snapshot) => {
                return (
                    <div 
                    className="column-inner"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                      background: snapshot.isDraggingOver ? '#B0E0E6' : 'white',
                      padding: 4,
                      border: '2px solid lightblue',
                      borderRadius: '3px',
                      width: 250,
                      minHeight: 500
                      }}
                      >
                        {props.column.tasks.map((item, index) => {
                          return (
                            <Task itemId={item.id} columnId={props.column.id} index={index} itemBody={item.body} key={item.id} setColumns={props.setColumns}/>
                          )
                        })}
                      {provided.placeholder}
                    </div>
                )
              }}
            </Droppable>
        </div>
      )}
      
    </Draggable>
  )
}