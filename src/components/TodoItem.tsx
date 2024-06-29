import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { Check, Delete, Edit } from '@mui/icons-material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { blue } from '@mui/material/colors';
import { db } from '../firebaseConfig';
import { useAuth } from './AuthProvider';

type TodoItemProps = {
  id: string,
  todo: string;
  done: boolean;
  createdAt: string;
};

function TodoItem({todo: initText, id, done: initDone}: TodoItemProps) {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const [todoText, setTodoText] = useState(initText);
  const [done, setDone] = useState(initDone);
  const [edit, setEdit] = useState(false);

  const handleDelete = async () => {
    try {
      // Delete todo document from Firestore
      const todoDoc = doc(db, 'todos', id);
      await deleteDoc(todoDoc);
      console.log('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleComplete = async () => {
    if (!currentUser) return;

    try {
      // Update 'done' field of todo document in Firestore
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
      // Update 'todo' field of todo document in Firestore
      const todoDoc = doc(db, 'todos', id);
      await updateDoc(todoDoc, {todo: todoText});
      console.log('todo updated');
      setEdit(false);
    } catch (e) {
      console.error(e);
      // Reset todoText to initial value on error
      setTodoText(initText);
    }
  }

  const handleCancel = () => {
    // Cancel editing and reset todoText to initial value
    setTodoText(initText);
    setEdit(false);
  }

  return (
    <Card 
        variant="outlined"
        sx={{
          bgcolor: done ? theme.palette.success.dark : blue[100],
        }}
    >
      <CardContent padding-bottom="0" sx={{borderRadius: '1rem'}}>
      {edit ? (
          <TextField
            fullWidth
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        ) : (
          <Grid 
          container
          spacing={2}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item xs={2} sm="auto">
            <IconButton onClick={handleComplete}>
              <Check sx={{ color: theme.palette.success.light }} />
            </IconButton>
          </Grid>
          <Grid item xs={10} sm>
            <Typography component='span' sx={{fontSize:'1.5rem'}}>
              {todoText}
            </Typography>         
            <Typography component='span' sx={{ fontSize: '0.75rem', color: 'gray', display: 'block' }}>
              {done ? 'DONE' : 'IN PROGRESS'}
            </Typography>
          </Grid>
          <Grid item xs={6} sm="auto" sx={{
            textAlign: { xs: 'center', sm: 'inherit' }
          }}>
            <IconButton onClick={handleEdit} >
              <Edit />
            </IconButton>
          </Grid>
          <Grid item xs={6} sm="auto" sx={{
            textAlign: { xs: 'center', sm: 'inherit' }
          }}>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
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