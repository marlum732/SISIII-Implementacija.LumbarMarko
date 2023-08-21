import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Flex, Heading, CheckboxGroup, Checkbox } from '@chakra-ui/react';
import supabase from '../services/supabaseClient';

function UserSettings() {
  const [username, setUsername] = useState('');
  const [favoriteClubs, setFavoriteClubs] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) setUser(data.user);
      if (error) setError(error.message);
    };

    const refreshSession = async () => {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
      }
      if (data) {
        console.log('Session refreshed:', data);
      }
    };

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('username, favoriteClubs')
        .eq('id', user.id)
        .single();

      if (error) setError(error.message);
      if (data) {
        setUsername(data.username || '');
        setFavoriteClubs(JSON.parse(data.favoriteClubs) || []);
      }
    };

    fetchUser();
    refreshSession();
    if (user) fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (event === 'USER_UPDATED') {
          console.log('USER_UPDATED', newSession);
          fetchUserData();
        }
      }
    );

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, [user]);

  const handleCheckboxChange = (values) => {
    setFavoriteClubs(values);
  };

  const handleUpdateSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert([
          {
            id: user.id,
            username: username,
            favoriteClubs: JSON.stringify(favoriteClubs),
          }
        ]);

      if (error) {
        setError(error.message);
        throw error;
      }

      console.log('User settings updated:', data);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <Flex width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading>User Settings</Heading>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="favoriteClubs">
          <FormLabel>Favorite Clubs</FormLabel>
          <CheckboxGroup onChange={handleCheckboxChange} value={favoriteClubs}>
            <Checkbox value="Club1">Pergola</Checkbox>
            <Checkbox value="Club2">Alaya</Checkbox>
            <Checkbox value="Club3">Tivoli</Checkbox>
            <Checkbox value="Club4">Retro</Checkbox>
            <Checkbox value="Club5">Bellavita</Checkbox>
            <Checkbox value="Club6">Canava</Checkbox>
          </CheckboxGroup>
        </FormControl>
        {error && <Box color="red.500">{error}</Box>}
        <Button colorScheme="blue" onClick={handleUpdateSettings}>Update Settings</Button>
      </VStack>
    </Flex>
  );
}

export default UserSettings;
