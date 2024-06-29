import React, { useState } from 'react';
import { AuthProvider } from './components/AuthProvider';
import AppContent from './components/AppContent';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleSwitchForm = () => {
    setShowLogin((prev) => !prev);
  };
  return (
    <AuthProvider>
      <AppContent showLogin={showLogin} handleSwitchForm={handleSwitchForm}/>
    </AuthProvider>
  );
}

export default App;
