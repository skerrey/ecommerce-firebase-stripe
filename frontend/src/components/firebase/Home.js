// Description: Home page component

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center text-center' style={{
        position: "relative",
        fontSize: "5em",
        color: "white",
        height: "100vh",
      }}>

        {!currentUser ? 
          <div>
            Welcome to <br/> Firebase Login App
          </div>      :               
          <div>
            Welcome <br/> {currentUser.displayName}
          </div>
        }
      </div>
    </div>
  )
}
