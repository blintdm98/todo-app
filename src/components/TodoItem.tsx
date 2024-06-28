import React, { useState } from 'react';
import { Card, CardContent, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { Check, Delete, Edit } from '@mui/icons-material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type TodoItemProps = {
  id: string,
  todo: string;
  done: boolean;
};

function TodoItem({todo: initText, id, done: initDone}: TodoItemProps) {
  const theme = useTheme();
  const [todoText, setTodoText] = useState(initText);
  const [done, setDone] = useState(initDone);
  const [edit, setEdit] = useState(false);

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

  const handleEdit = () => {
    setEdit(true);
  }

  const handleSave = async () => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await updateDoc(todoDoc, {todo: todoText});
      console.log('todo updated');
      setEdit(false);
    } catch (e) {
      console.error(e);
      setTodoText(initText);
    }
  }

  const handleCancel = () => {
    setTodoText(initText);
    setEdit(false);
  }

  return (
    <Card 
        variant="outlined"
        sx={{
          bgcolor: done ? theme.palette.success.dark : 'lightgray',
        }}
    >
      <CardContent>
      {edit ? (
          <TextField
            fullWidth
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        ) : (
        <Typography 
          variant='h5' 
          component='h2'
          >
            <IconButton onClick={handleComplete}>
                <Check sx={{ color: 'green'}}/>
            </IconButton>
            {todoText}
            <IconButton onClick={handleEdit} sx={{ float: 'right' }}>
                <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ float: 'right' }}>
                <Delete/>
            </IconButton>
        </Typography>
        )}
        {edit && (
          <div style={{ marginTop: '8px' }}>
            <IconButton onClick={handleSave}>
              <Check sx={{ color: 'green' }} />
            </IconButton>
            <IconButton onClick={handleCancel} sx={{ marginLeft: 1 }}>
              <Delete />
            </IconButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TodoItem;