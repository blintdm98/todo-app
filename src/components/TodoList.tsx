import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { CardContent } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type TodoState = {
    id: string,
    todo: string
}

function TodoList() {
    const [todo, setTodo] = useState<TodoState[]>([])

    useEffect(() => {
        const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todosData: TodoState[] = [];
            querySnapshot.forEach((doc) => {
              todosData.push({ id: doc.id, todo: doc.data().todo });
            });
            setTodo(todosData);
          });

          return() => unsubscribe();
    })
  return (
    <CardContent sx={{ padding: '1px', width: '80%'}}>
        { todo && todo.map((todo: TodoState) => {
            return (
                <TodoItem key={todo.id} todoText={todo.todo}/>
            )
        })}
    </CardContent>
  );
}

export default TodoList;