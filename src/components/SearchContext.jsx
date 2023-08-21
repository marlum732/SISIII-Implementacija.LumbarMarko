import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext({
    searchQuery: "",
    setQuery: () => {}
});

export const useSearch = () => {
    return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const setQuery = (query) => {
        setSearchQuery(query);
    };

    const value = {
        searchQuery,
        setQuery
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
