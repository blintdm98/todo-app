import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

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
      <input type="email" {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}
      <input type="password" {...register('password', { required: true })} placeholder="Password" />
      {errors.password && <span>Password is required</span>}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;