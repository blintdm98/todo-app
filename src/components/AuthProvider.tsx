import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Define the shape of the context value
type AuthContextType = {
  currentUser: User | null;
  userLoggedIn: boolean;
  signOut: () => Promise<void>;
};

// Create the context object with an initial undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// AuthProvider component manages authentication state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // State for current user
  const [userLoggedIn, setUserLoggedIn] = useState(false); // State for user login status

  // Effect hook to subscribe to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to sign out the current user
  const signOut = async () => {
    await auth.signOut();
  };

  const value: AuthContextType = {
    currentUser,
    userLoggedIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}