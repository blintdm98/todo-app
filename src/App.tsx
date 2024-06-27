import React from 'react';
import { Box, Container } from '@mui/material';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
      <Container sx={{paddingTop: '10px',width: {sm:'100%', md:'80%', lg: '100vh'}}}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
            p: 3,
            height: '90vh',
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
