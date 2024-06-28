import React from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}
      <input type="password" {...register('password', { required: true })} placeholder="Password" />
      {errors.password && <span>Password is required</span>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;