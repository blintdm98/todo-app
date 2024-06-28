import React, { useState } from 'react';
import { Card, CardContent, IconButton, Typography, useTheme } from '@mui/material';
import { Check, Delete } from '@mui/icons-material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type TodoItemProps = {
  id: string,
  todoText: string;
  done: boolean;
};

function TodoItem({todoText, id, done: initDone}: TodoItemProps) {
  const theme = useTheme();
  const [done, setDone] = useState(initDone);

  const handleDelete = async () => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await deleteDoc(todoDoc);
      console.log('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleComplete = async () => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await updateDoc(todoDoc, {done: !done});
      setDone(!done);
      console.log('todo updated');
    } catch (e) {
      console.error('error updating', e);
    }
  }

  return (
    <Card 
        variant="outlined"
        sx={{
          bgcolor: done ? theme.palette.success.dark : 'lightgray',
        }}
    >
      <CardContent>
        <Typography 
          variant='h5' 
          component='h2'
          >
            <IconButton onClick={handleComplete}>
                <Check sx={{ color: 'green'}}/>
            </IconButton>
            {todoText}
            <IconButton onClick={handleDelete} sx={{ float: 'right' }}>
                <Delete/>
            </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TodoItem;