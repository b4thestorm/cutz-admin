'use client'
import { createContext, useEffect, useState } from 'react';

type User = {
         id: string;
         image_url: string;
         email: string;
         description: string;
         street_address: string;
         city: string;
         state: string;
         zip_code: string;
         first_name: string;
         last_name: string;
         title: string;
         role: string;
      }

interface UserContextProps {
  user: User;
  fetchUser: (id: string) => Promise<any>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: ()=> void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps>({
  user: {id: "",
    image_url: "",
    email: "",
    description: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    first_name: "",
    last_name: "",
    title: "",
    role: ""
  },
  fetchUser: async() => {},
  setIsAuthenticated: (boolean) => {},
  setUser: (User) => {},
  logout: ()=>{},
  isAuthenticated: false,
});

export const UserProvider = ({children}: {children: React.ReactElement | React.ReactElement[]}) => {
    const [user, setUser] = useState({
      id: "",
      image_url: "",
      email: "",
      description: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      first_name: "",
      last_name: "",
      title: "",
      role: ""
    }); // Initial state for the user
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial state for the user
  
    const logout = () => {
      fetch(`http://localhost:8000/logout`, {
        method:"GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((resp) => {
        console.log("success 200")
        setIsAuthenticated((prevState) => !prevState)
        window.localStorage.removeItem('user')
      })
    };
    
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
      fetchUser,
      setUser,
      logout,
      isAuthenticated,
      setIsAuthenticated
    };
  
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  };