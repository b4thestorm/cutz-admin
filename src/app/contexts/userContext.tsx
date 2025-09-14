'use client'
import { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/utils';
import { useRouter } from 'next/navigation'

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

type  Profile = {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  description: string;
  image_url: string | null;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
}

interface UserContextProps {
  user: User;
  fetchUser: (id: string) => Promise<any>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: ()=> void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
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
  profile: {id: "", first_name: "", last_name: "", title: "", description: "", image_url: null, street_address: "", city: "", state: "", zip_code: ""},
  setProfile: (Profile) => {}
});

export const UserProvider = ({children}: {children: React.ReactElement | React.ReactElement[]}) => {
    const router = useRouter()
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
    const [profile, setProfile] = useState({id: "", first_name: "", last_name: "", title: "", description: "", image_url: null, street_address: "", city: "", state: "", zip_code: ""})

    const logout = () => {
      fetch(`${BASE_URL}/logout`, {
        credentials: 'include',
        method:"GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((resp) => {
        setIsAuthenticated((prevState) => !prevState)
        localStorage.removeItem('user')
        setUser({id: "",
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
      })
      })
      router.push('/');
    };
    
    const fetchUser = async (id: string) => {
        const response= await fetch(`${BASE_URL}/users/${id}/`, {
          credentials: 'include',
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
      setIsAuthenticated,
      profile,
      setProfile
    };

    useEffect(() => {
      if (localStorage.hasOwnProperty('user')) {
        setIsAuthenticated(true)
      }
    }, [])
  
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  };