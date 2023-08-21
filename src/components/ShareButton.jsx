import React from 'react';
import { Box, Icon, IconButton, HStack } from "@chakra-ui/react";
import { FaFacebook, FaTwitter} from "react-icons/fa";

function ShareButton({ url, title }) {
  const facebook = `https://www.facebook.com/sharer.php?u=${url}`;
  const twitter = `https://twitter.com/share?url=${url}&text=${title}`;

  return (
    <HStack spacing={2}>
      <IconButton 
        as="a" 
        href={facebook} 
        target="_blank" 
        aria-label="Share on Facebook" 
        icon={<Icon as={FaFacebook} />} 
        colorScheme="facebook"
      />
      <IconButton 
        as="a" 
        href={twitter} 
        target="_blank" 
        aria-label="Share on Twitter" 
        icon={<Icon as={FaTwitter} />} 
        colorScheme="twitter"
      />
    </HStack>
  );
}

export default ShareButton;
