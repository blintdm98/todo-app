import React from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Check, Delete } from '@mui/icons-material'

type TodoItemProps = {
  todoText: string;
};

function TodoItem({todoText}: TodoItemProps) {
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
            <IconButton sx={{ float: 'right' }}>
                <Delete/>
            </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TodoItem;