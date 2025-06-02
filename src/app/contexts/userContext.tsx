import { createContext, useState, ReactNode } from 'react';

interface UserContextProps {
  user: null;
  fetchUser: (id: string) => Promise<any>;
}
export const UserContext = createContext<UserContextProps>({
  user: null,
  fetchUser: async() => {}
});

export const UserProvider = ({children}: {children: React.ReactElement}) => {
    const [user, setUser] = useState(null); // Initial state for the user
  
    // You can add more state and functions related to user management here
    const login = (userData: any) => {
      setUser(userData);
      // Potentially store user data in localStorage or sessionStorage
    };
  
    // const logout = () => {
    //   setUser(null);
    //   // Potentially remove user data from localStorage or sessionStorage
    // };
    
    const fetchUser = async (id: string) => {
        const response= await fetch(`http://localhost:8000/users/${id}`, {
          method:"GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        return await response.json();
    }

    const contextValue = {
      user,
      fetchUser
    };
  
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  };