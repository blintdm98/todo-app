## Todo App with Firebase Firestore and React

A simple Todo application built using React and Firebase Firestore. Users can add, edit, delete, and mark todos as complete. The app is responsive and adjusts to different screen sizes (mobile, tablet, desktop).

### Features

Authentication: Users can sign up, log in, and log out securely using Firebase Authentication.

Todo Management: Users can add new todos, mark them as complete, edit existing todos, and delete todos.

Real-time Updates: Todos are synchronized in real-time using Firebase Firestore.

Responsive Design: The application is responsive and works well across various devices.

### Technologies Used

React: Front-end library for building user interfaces.

Firebase Firestore: Cloud Firestore database from Firebase for storing todos.

Firebase Authentication: Firebase Authentication for user authentication and authorization.

Material-UI: React component library for UI design.

react-hook-form: Library for managing form state and validation in React.

### Access the application

Open [TodoApp](https://todo-app-blintdm.web.app/) in your browser to view the Todo app.

### Folder structure

src/: Contains all source code files.

components/: React components used in the application.

firebaseConfig.ts: Firebase configuration file.

App.tsx: Main application component.

index.tsx: Entry point of the application.

public/: Public assets and index.html.

## Usage
Sign Up/Login: Users can sign up for a new account or log in using existing credentials.

Add Todo: Click on the "Add Todo" input field, type a new todo, and press "Add".

Edit Todo: Click on the edit icon next to a todo, modify the text, and press the check icon to save changes.

Mark as Complete: Click on the check icon next to a todo to mark it as complete.

Delete Todo: Click on the delete icon next to a todo to delete it permanently.
