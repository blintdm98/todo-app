import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Container sx={{paddingTop: '10px',width: {sm:'100%', md:'80%', lg: '100vh'}}}>
        <Box 
          className="scroll-box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
            p: 3,
            height: '90vh',
            backgroundColor: 'rgba(255, 255, 255, 0.4);',
            overflow: 'auto',
            maxHeight: '100%'
          }}
        >
          <Typography variant="h3" gutterBottom>
            Todo App
          </Typography>
          <Register />
          <Login />
          <AddTodo />
          <TodoList/>
        </Box>
      </Container>
    </AuthProvider>
  );
}

export default App;
