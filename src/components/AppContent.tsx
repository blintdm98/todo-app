import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Register from './Register';
import Login from './Login';
import { useAuth } from './AuthProvider';

type AppContentProps = {
  showLogin: boolean;
  handleSwitchForm: () => void;
};

function AppContent({ showLogin, handleSwitchForm }: AppContentProps) {
  const { currentUser, signOut } = useAuth();

  return (
    <Container sx={{ paddingTop: '10px', width: { sm: '100%', md: '80%', lg: '100vh' } }}>
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
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          overflow: 'auto',
          maxHeight: '100%'
        }}
      >
        <Typography variant="h3" gutterBottom>
          Todo App
        </Typography>
        {currentUser ? (
          <>
            <Button onClick={signOut} variant="contained" color="secondary" sx={{ marginBottom: '1rem' }}>
              Sign Out
            </Button>
            <AddTodo />
            <TodoList />
          </>
        ) : (
          <>
            {showLogin ? (
              <>
                <Login />
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">Don't have an account yet?</Typography>
                  <Button onClick={handleSwitchForm} color="primary">
                    Register here
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Register />
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">Already have an account?</Typography>
                  <Button onClick={handleSwitchForm} color="primary">
                    Log in here
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default AppContent;
