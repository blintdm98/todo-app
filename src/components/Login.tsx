import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Stack, TextField } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

type LoginState = {
  email: string,
  password: string
}

function Login() {
  //Init the form with react-hook-form
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginState>();

  //Handle form
  const onSubmit: SubmitHandler<LoginState> = async (data) => {
    try {
      // Attempt to sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('User logged in:', userCredential.user);
    } catch (error: any) {
      //Error handling, if matches the email or password
      if (error.code === 'auth/user-not-found') {
        setError('email', { type: 'manual', message: 'Email address not found' });
      } else if (error.code === 'auth/wrong-password') {
        setError('password', { type: 'manual', message: 'Incorrect password' });
      } else {
        console.error('Error logging in user:', error);
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '400px', mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl error={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              placeholder="Type in here…" 
              {...register('email', { required: 'Email is required' })} 
            />
            <FormHelperText>
              {errors.email && (
                <Box display="flex" alignItems="center">
                  <InfoOutlined sx={{ mr: 0.5 }} />
                  {errors.email  ? String(errors.email.message) : ""}
                </Box>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl error={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              placeholder="Type in here…" 
              {...register('password', { required: 'Password is required' })} 
            />
            <FormHelperText>
              {errors.password && (
                <>
                  <InfoOutlined />
                  {errors.password.message}
                </>
              )}
            </FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Login;