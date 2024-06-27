import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addDoc, collection,  } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type TodoState = {
    todo: string,
    done: false
}

function AddTodo() {
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<TodoState>();
    const onSubmit = async (data: TodoState) => {
        try {
            await addDoc(collection(db, 'todos'), {
                todo: data.todo,
                done: false,
                createdAt: new Date(),
            });
            console.log("todo added") 
        } catch (err) {
            console.error("error", err);
        }
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
