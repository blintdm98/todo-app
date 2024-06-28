import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Box, CardContent } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type TodoState = {
    id: string,
    todo: string,
    done:boolean
}

function TodoList() {
    const [todo, setTodo] = useState<TodoState[]>([])

    useEffect(() => {
        const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todosData: TodoState[] = [];
            querySnapshot.forEach((doc) => {
              todosData.push({
                id: doc.id,
                todo: doc.data().todo,
                done: doc.data().done });
            });
            setTodo(todosData);
          });

          return() => unsubscribe();
    })
  return (
    <CardContent sx={{ padding: '1px', width: '80%', marginBottom: '1rem'}}>
        { todo && todo.map((todo: TodoState) => {
            return (
              <Box key={todo.id} sx={{ marginBottom: '1rem' }}>
                <TodoItem key={todo.id} id={todo.id} todo={todo.todo} done={todo.done}/>
              </Box>
            )
        })}
    </CardContent>
  );
}

export default TodoList;