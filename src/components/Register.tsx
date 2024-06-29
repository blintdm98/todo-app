import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Stack, TextField } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

function Register() {
  // Init the form with react-hook-form
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  //Handle form
  const onSubmit = async (data: any) => {
    try {
      // Attempt to create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('User registered:', userCredential.user);
    } catch (error:any) {
      //Error handling
      if (error.code === 'auth/email-already-in-use') {
        setError('email', { type: 'manual', message: 'Email address is already in use' });
      } else {
        console.error('Error registering user:', error);
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
              {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address'
                  }
              })} 
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
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password should be atleast 6 characters' }  })} 
            />
            <FormHelperText>
              {errors.password && (
                <Box display="flex" alignItems="center">
                <InfoOutlined sx={{ mr: 0.5 }} />
                {errors.password  ? String(errors.password.message) : ""}
                </Box>
              )}
            </FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Register;