import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, TextField } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.error('Error registering user:', error);
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
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} 
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
          Register
        </Button>
      </Stack>
    </form>
  );
}

export default Register;