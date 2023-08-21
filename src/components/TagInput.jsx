import React, { useState } from 'react';
import { Box, Input, Tag, TagLabel, TagCloseButton, HStack } from '@chakra-ui/react';

function TagInput({ tags, setTags }) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue) {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <Box>
            <HStack spacing={4} mb={4}>
                {tags.map(tag => (
                    <Tag size="md" key={tag} variant="solid" colorScheme="blue">
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton onClick={() => removeTag(tag)} />
                    </Tag>
                ))}
            </HStack>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a tag and press Enter..."
                onKeyDown={handleKeyDown}
            />
        </Box>
    );
}

export default TagInput;
