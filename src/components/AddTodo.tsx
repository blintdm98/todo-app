import React, { useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

type TodoState = {
    id: number,
    todo: string
}

function AddTodo() {
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<TodoState>();
    const onSubmit = (data: TodoState) => {
        console.log(data)
    };
    return (
        <Box sx={{ display: 'flex', width:'80%', mb: 2 }}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', width: '100%'}}>
                <TextField 
                    fullWidth 
                    placeholder="Add Todo" 
                    {...register("todo", {maxLength: 50, required:"there is no todo"})}
                    // error={!!errors.todo && touchedFields.todo}
                    // helperText={touchedFields.todo && errors.todo ? errors.todo.message : ''} 
                    />
                <Button variant="contained" color="primary" sx={{ ml: 2 }} type='submit'>
                    Add
                </Button>
            </form>
        </Box>
    );
    }

export default AddTodo;
