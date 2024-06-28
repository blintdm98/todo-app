import React from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Check, Delete } from '@mui/icons-material'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type TodoItemProps = {
  id: string,
  todoText: string;
};

function TodoItem({todoText, id}: TodoItemProps) {

  const handleDelete = async () => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await deleteDoc(todoDoc);
      console.log('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Card 
        variant="outlined"
        sx={{
            backgroundColor: 'lightgray',
        }}
    >
      <CardContent>
        <Typography variant='h5' component='h2'>
            <IconButton>
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