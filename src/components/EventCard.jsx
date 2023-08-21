import React from 'react';
import { Box, Image, Text, Heading, Tag, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function EventCard({ event }) {
    if (!event) return null;

    const displayDate = event.date.seconds ? new Date(event.date.seconds * 1000).toLocaleDateString() : event.date;

    const displayLocation = typeof event.location === 'object' 
        ? `${event.location._lat}, ${event.location._long}`
        : event.location;

    function truncateText(text, length = 60) {
        if (text.length <= length) return text;
        return text.slice(0, length) + "...";
    }

    const tags = event.tags || [];//default emtpy

    return (
        <Link as={RouterLink} to={`/event/${event.id}`} _hover={{ textDecoration: 'none' }}>
            <Box 
                key={event.id}
                maxW="30rem"
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden"
                p={5}
            >
                <Image src={event.imageURL} alt={event.name} width="100%" objectFit="cover" />
                <Heading size="md" mt={4}>{event.name}</Heading>
                <Text mt={2}>{truncateText(event.summary)}</Text>
                <HStack mt={4} spacing={4}>
                    {tags.map(tag => (
                        <Tag key={tag} size="md" variant="outline" colorScheme="blue">
                            {tag}
                        </Tag>
                    ))}
                </HStack>
                <Text mt={4}>Date: {displayDate}</Text>
                <Text mt={2}>Location: {displayLocation}</Text>
                <Text>Time: {event.time}</Text>
                <Text mt={4} color="blue.500">Price: ${event.price}</Text>
            </Box>
        </Link>
    );
}

export default EventCard;
