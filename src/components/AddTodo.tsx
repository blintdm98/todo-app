import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addDoc, collection,  } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './AuthProvider';

type TodoState = {
    todo: string,
    done: false,
    userId: string
}

function AddTodo() {
    const { currentUser } = useAuth();
    // React Hook Form for form handling
    const { register, handleSubmit, formState: { errors, touchedFields }, reset } = useForm<TodoState>();

    // Handle form submission
    const onSubmit = async (data: TodoState) => {
        try {
            // Add a new document to the 'todos' collection in Firestore
            await addDoc(collection(db, 'todos'), {
                todo: data.todo,
                done: false,
                createdAt: new Date(),
                userId: currentUser!.uid,
            });
            console.log("todo added") 
        } catch (err) {
            console.error("error", err);
        }
        reset(); // Reset form fields after submission
    };
    return (
        <Box sx={{ display: 'flex', width:'80%', mb: 2 }}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', width: '100%'}}>
                <TextField 
                    id="outlined-basic" 
                    label="Add Todo" 
                    variant="outlined"
                    fullWidth 
                    {...register("todo", {maxLength: 50, required:"There is no todo item. Please enter a todo before adding."})}
                    error={!!errors.todo && touchedFields.todo}
                    helperText={touchedFields.todo && errors.todo ? errors.todo.message : ''} 
                    />
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ ml: 2, maxHeight:'56px' }} 
                    type='submit'>
                    Add
                </Button>
            </form>
        </Box>
    );
    }

export default AddTodo;
