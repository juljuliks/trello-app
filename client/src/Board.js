import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import { AuthContext } from './context/AuthContext';
import AddColumnBtn from './components/AddColumnBtn';
import Column from './components/Column';

const onDragEnd = async (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination, type} = result;
  console.log(columns);

  if(type === 'column') {
    let columnsArr = []
    for(let i = 0; i < Object.entries(columns).length; i+=1) {
      const [,el] = Object.entries(columns)[i]
      columnsArr.push(el)
    }
    let [removed] = columnsArr.splice(source.index, 1)
    columnsArr.splice(destination.index, 0, removed)

    let objectFromArr = {}
    for(let i = 0; i < columnsArr.length; i+=1) {
      objectFromArr[i] = columnsArr[i]
    }
    const response = await fetch('/api/update-columns', {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: JSON.stringify(columnsArr)
    })
    if(response.ok) {
      setColumns(objectFromArr)
    }
    return 
  }

  let data;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.tasks];
    const destItems = [...destColumn.tasks];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    data = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destItems
      }
    }
    setColumns(data);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.tasks];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    data = {
      ...columns,
      [source.droppableId]: {
        ...column,
        tasks: copiedItems
      }
    }
    setColumns(data);
  }
  await fetch('/api/update-tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
};


function Board() {
  const {boardId} = useParams()
  const auth = useContext(AuthContext)
  const [columns, setColumns] = useState({})

    useEffect(() => {
    if(auth.userId) {
      fetch(`/users/${auth.userId}/boards/${boardId}`).then(
        res => res.json()
      ).then(setColumns)
    }
    }, [auth.userId, boardId])
  
    useEffect(() => {
      let curBoard = localStorage.getItem('boardId')
      if(curBoard !== boardId) {
        localStorage.setItem('boardId', boardId )
      }
      return () => {
        localStorage.setItem('boardId', '' )
      }
    }, [boardId])

  return (
    <div className="columns-wrapper container my-5 d-flex">
      <AddColumnBtn setColumns={setColumns} columns={columns}/>
      <DragDropContext 
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column"> 
          {(provided) => (
            <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
              style={{
              display: 'flex',
              justifyContent: 'start',
              }}>
              {Object.entries(columns).map(([id, column], index) => {
                return (
                  <Column id={id} index={index} column={column} key={id} setColumns={setColumns}/>
                )
                })}
              {provided.placeholder}
            </div>
          )}
            
          </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Board