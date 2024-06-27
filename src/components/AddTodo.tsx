import React from 'react';
import { Box, Button, TextField } from '@mui/material';

function AddTodo() {
  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <TextField fullWidth placeholder="Add Todo" />
      <Button variant="contained" color="primary" sx={{ ml: 2 }}>
        Add
      </Button>
    </Box>
  );
}

export default AddTodo;
