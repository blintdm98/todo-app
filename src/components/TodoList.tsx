import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { Box, CardContent } from '@mui/material';
import { collection, getDoc, getDocs, orderBy, QueryDocumentSnapshot, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from './AuthProvider';

type TodoState = {
    id: string,
    todo: string,
    done:boolean,
    createdAt: string,
    userId: string
}

function TodoList() {
  const { currentUser } = useAuth();
  const [todo, setTodo] = useState<TodoState[]>([])

  useEffect(() => {
    if (!currentUser) {
      setTodo([]);
      return;
    }

    // Firestore query to get todos for the current user
    const q = query(collection(db, 'todos'), where('userId', '==', currentUser.uid));

    // Subscribe to realtime updates on todos collection
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: TodoState[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        todosData.push({
          id: doc.id,
          todo: doc.data().todo,
          done: doc.data().done,
          createdAt: doc.data().createdAt,
          userId: doc.data().userId
        });
      });
      setTodo(todosData);
    }, (error) => {
      console.error('Error fetching todos:', error);
      // Handle error state or retry logic if needed
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please log in to view your todos.</p>;
  }

  return (
    <CardContent sx={{ padding: '1px', width: '80%', marginBottom: '1rem' }}>
      {todo.map((todo: TodoState) => {
        return (
          <Box key={todo.id} sx={{ marginBottom: '1rem' }}>
            <TodoItem key={todo.id} id={todo.id} todo={todo.todo} done={todo.done} createdAt={todo.createdAt} />
          </Box>
        )
      })}
    </CardContent>
  );
}

export default TodoList;