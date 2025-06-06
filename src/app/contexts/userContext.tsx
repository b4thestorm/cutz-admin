import { redirect } from "next/navigation";
import { createContext, useState } from 'react';

interface UserContextProps {
  user: null;
  fetchUser: (id: string) => Promise<any>;
  mapUser: ({})=> void;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: ()=> void;
  isAuthenticated: boolean;
}
export const UserContext = createContext<UserContextProps>({
  user: null,
  fetchUser: async() => {},
  mapUser: () => {},
  setUser: ({}: any) => {},
  logout: ()=>{},
  isAuthenticated: false
});

export const UserProvider = ({children}: {children: React.ReactElement}) => {
    const [user, setUser] = useState(null); // Initial state for the user
    const [isAuthenticated, setIsAutheticated] = useState(false); // Initial state for the user
  
    const logout = () => {
      fetch(`http://localhost:8000/logout`, {
        method:"GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((resp) => {
        console.log("success 200")
        window.localStorage.removeItem('user')
      })
      setUser(null);
      redirect('/')
    };

    const mapUser = (payload: any) => {
      return ({
        id: payload.id,
        image_url: payload.image_url,
        email: payload.email,
        description: payload.description,
        street_address: payload.street_address,
        city: payload.city,
        state: payload.state,
        zip_code: payload.zip_code,
        first_name: payload.first_name,
        last_name: payload.last_name,
        title: payload.title,
        role: payload.role
      })
    }
    
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
      mapUser,
      setUser,
      logout,
      isAuthenticated
    };
  
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  };