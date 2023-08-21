import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import { useSearch } from '../components/SearchContext';
import supabase from '../services/supabaseClient';

function Navigation() {
  const { searchQuery, setQuery } = useSearch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      if (data) {
        const { session, user } = data;
        setUser(user);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        switch (event) {
          case 'SIGNED_IN':
            console.log('SIGNED_IN', newSession);
            setUser(newSession.user);
            break;
          case 'SIGNED_OUT':
            console.log('SIGNED_OUT', newSession);
            setUser(null);
            break;
          case 'TOKEN_REFRESHED':
            console.log('TOKEN_REFRESHED', newSession);
            setUser(newSession.user);
            break;
          case 'USER_UPDATED':
            console.log('USER_UPDATED', newSession);
            setUser(newSession.user);
            break;
          default:
            break;
        }
      }
    );

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, []);

  const handleSearch = (searchText) => {
    setQuery(searchText);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      return;
    }
    setUser(null);
    navigate('/home');
  };

  return (
    <Flex justifyContent="space-between" p={5} bg="blue.500" color="white" align="center">
      <Box display="flex" alignItems="center">
        <Link to="/home">Home</Link>
        <Spacer width="2rem" />
        <SearchInput onSearch={handleSearch} />
      </Box>
      <Box>
        {user ? (
          <>
            {/* <Box as={Link} to="/settings" mr={7}>
              User Settings
            </Box> */}
            <Button
              onClick={handleLogout}
              colorScheme="blue"
              size="sm"
              border="2px"
              borderColor="white"
              mr={7}
            >
              Logout
            </Button>
            <Button as={Link} to="/addevent" colorScheme="blue" size="sm" border="2px" borderColor="white">
              Add Event
            </Button>
          </>
        ) : (
          <>
            <Box as={Link} to="/login" mr={7}>
              Login
            </Box>
            <Box as={Link} to="/signup" mr={7}>
              Signup
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default Navigation;
