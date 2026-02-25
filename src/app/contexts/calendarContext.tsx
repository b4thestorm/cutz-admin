'use client'
import React, { createContext, useState} from 'react'
import { BASE_URL } from '../utils/utils';

interface CalendarContextProps {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  disconnect: any;
  response: EventSource; 
}

export const CalendarContext = createContext<CalendarContextProps>({enabled: false, setEnabled: ()=> {}, disconnect: () => {}, response: new EventSource('')})

export const CalendarProvider = ({ children }: { children: React.ReactElement | React.ReactElement[]}) => {
  const [response, setResponse] = useState<EventSource>(new EventSource(`${BASE_URL}/integrations/events/`));
  const [enabled, setEnabled] = useState(() => {
          if (typeof window !== "undefined") {
              try {
                  return localStorage.getItem('enabled') === "true" || false;
              } catch (error) {
                  console.error("Error retrieving from localStorage:", error);
                  return false
              }
          } else {
            return false
          }
  })

  const disconnect = () => {
          //simply remove enabled from localStorage and that disables the view
          localStorage.removeItem('enabled')
          setEnabled(false)
  }
  
  const contextValue = {
      enabled,
      setEnabled, 
      disconnect,
      response,
    };


  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  )
}
