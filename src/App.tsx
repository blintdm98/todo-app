import React from 'react';
import { Box, Container } from '@mui/material';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
      <Container maxWidth='md'>
        <Box 
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            boxShadow: 3,
            borderRadius: 2,
            p: 3,
            height: '90vh',
            width: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.4);'
          }}
        >
          <AddTodo/>
          <TodoList/>
        </Box>
      </Container>
  );
}

export default App;
