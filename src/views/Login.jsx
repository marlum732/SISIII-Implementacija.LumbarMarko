import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Flex, Heading } from '@chakra-ui/react';
import { signIn } from '../services/supabaseAuthService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await signIn(email, password);
      if (error) throw error;

      console.log('User logged in:', user);
      navigate('/home');
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <Flex width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
          <Heading>Login</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && <Box color="red.500">{error}</Box>}
          <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
        </VStack>
    </Flex>
  );
}

export default Login;