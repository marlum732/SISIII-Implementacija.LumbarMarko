import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('error: useAuth');
    }
    return context;
};



export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
