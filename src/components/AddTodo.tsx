import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

type AddState = {
    todo: string
}

function AddTodo() {
    const { register, handleSubmit} = useForm<AddState>();
    const onSubmit = (data: AddState) => {console.log(data)};
    return (
        <Box sx={{ display: 'flex', width:'80%', mb: 2 }}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', width: '100%'}}>
            <TextField fullWidth placeholder="Add Todo" {...register("todo", {max: 50})} />
            <Button variant="contained" color="primary" sx={{ ml: 2 }} type='submit'>
                Add
            </Button>
            </form>
        </Box>
    );
    }

export default AddTodo;
