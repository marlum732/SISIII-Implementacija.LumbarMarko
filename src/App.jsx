import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './views/HomePage';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import Navigation from './components/Navigation.jsx';
import EventForm from './views/EventForm';
import EventDetails from './views/EventDetails';
import { ChakraProvider } from "@chakra-ui/react";
import { SearchProvider } from './components/SearchContext';
import UserSettings from './components/UserSettings';


function App() {
  return (
    <ChakraProvider>
      <SearchProvider>
        <div style={{ width: '100%' }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addevent" element={<EventForm />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </div>
      </SearchProvider>
    </ChakraProvider>
  );
}

export default App;
