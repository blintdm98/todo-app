import React from 'react';
import TodoItem from './TodoItem';
import { CardContent } from '@mui/material';

type TodoState = {
    id: number,
    todo: string
}

function TodoList() {
    const todoList: TodoState[] = [
        {
          id: 1,
          todo: 'kellj fel'
        },
        {
          id: 2,
          todo: 'fekudj le'
        },
        {
          id: 3,
          todo: 'menj haza'
        },
      ]
  return (
    <CardContent sx={{ padding: '1px', width: '80%'}}>
        { todoList && todoList.map((todo: TodoState) => {
            return (
                <TodoItem key={todo.id} todoText={todo.todo}/>
            )
        })}
    </CardContent>
  );
}

export default TodoList;