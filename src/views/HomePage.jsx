import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../services/supabaseEventService';
import EventGrid from '../components/EventGrid';
import { useSearch } from '../components/SearchContext';
import LocationSelector from '../components/LocationSelector';
import DateSelector from '../components/DateSelector';
import TagSelector from '../components/TagSelector';
import PriceSelector from '../components/PriceSelector';
import ClubSelector from '../components/ClubSelector';
import { Heading, Flex } from '@chakra-ui/react';
import supabase from '../services/supabaseClient';

function HomePage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery } = useSearch();
  
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState(null);
  const [selectedClub, setSelectedClub] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setUser(null);
        return;
      }
      if (data) {
        const { user } = data;
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
  
    fetchUser();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (newSession) {
          const { user } = newSession;
          setUser(user);
        } else {
          setUser(null); 
        }
      }
    );

    const getEvents = async () => {
            const fetchedEvents = await fetchEvents();
            let filteredEvents = fetchedEvents;


            if (searchQuery) {
                filteredEvents = filteredEvents.filter(event =>
                    event.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            if (selectedLocation) {
                filteredEvents = filteredEvents.filter(event =>
                    event.location === selectedLocation
                );
            }

            if (selectedDate) {
                filteredEvents = filteredEvents.filter(event =>
                    event.date === selectedDate
                );
            }

            if (selectedTag) {
                filteredEvents = filteredEvents.filter(event => 
                    Array.isArray(event.tags) && event.tags.includes(selectedTag)
                );
            }

            if (selectedPriceFilter) {
                filteredEvents = filteredEvents.filter(event =>
                    selectedPriceFilter.condition(event.price)
                );
            }

            if (selectedClub) {
                filteredEvents = filteredEvents.filter(event => event.club === selectedClub);
            }

            setEvents(filteredEvents);
            setIsLoading(false);  
        };
       
        getEvents();

        return () => {
            if (authListener && typeof authListener.unsubscribe === 'function') {
              authListener.unsubscribe();
            }
          };
        }, [searchQuery, selectedLocation, selectedDate, selectedTag, selectedPriceFilter, selectedClub]);
      
        return (
          <div>
            <Flex align="center" justify="space-between" mb={4}>
              <Heading size="2xl" mb={5} mt={5} ml={5}>EVENTS</Heading>
              <Flex>
                <LocationSelector onSelectLocation={setSelectedLocation} selectedLocation={selectedLocation} />
                <DateSelector onSelectDate={setSelectedDate} selectedDate={selectedDate} />
                <TagSelector onSelectTag={setSelectedTag} selectedTag={selectedTag} />
                <PriceSelector onSelectPriceFilter={setSelectedPriceFilter} selectedPriceFilter={selectedPriceFilter?.label} />
                {user && <ClubSelector onSelectClub={setSelectedClub} selectedClub={selectedClub} />}
              </Flex>
            </Flex>
            <EventGrid events={events} isLoading={isLoading} />
          </div>
        );
      }
      
      export default HomePage;