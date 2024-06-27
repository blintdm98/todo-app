import React from 'react';
import TodoItem from './TodoItem';
import { CardContent } from '@mui/material';

function TodoList() {
  return (
    <CardContent sx={{ padding: '1px', width: '80%'}}>
        <TodoItem/>
    </CardContent>
  );
}

export default TodoList;