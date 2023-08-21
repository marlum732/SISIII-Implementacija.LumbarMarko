import React from 'react';
import { SimpleGrid, Heading } from '@chakra-ui/react';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';

function EventGrid({ events, isLoading }) {
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div>
            
            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                spacing={6}
            >
                {isLoading && skeletons.map((skeleton, index) => (
                    <EventCardSkeleton key={index} />
                ))}
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </SimpleGrid>
        </div>
    );
}

export default EventGrid;
