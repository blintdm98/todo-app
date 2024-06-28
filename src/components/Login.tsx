import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, TextField } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

type LoginState = {
  email: string,
  password: string
}

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginState>();

  const onSubmit: SubmitHandler<LoginState> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
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
              <>
                <InfoOutlined />
                {errors.email.message}
              </>
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
  );
}

export default Login;