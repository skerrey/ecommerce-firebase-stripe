// Description: Background image for site

import React from 'react'

export default function Background() {
  return (
    <>
      <div style={{
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        opacity: "0.4",
        position: "absolute",
        zIndex: "-1",
        width: "100%",
        height: "100vh",
      }}>
      </div>  
      <div style={{
        backgroundImage: `url('https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, 
        backgroundPosition: 'center',
        position: "absolute",
        zIndex: "-2",
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        width: "100%",
        height: "100vh",
      }}>{/* Background image by Fiona Art from Pexels */}
      </div>
    </>
  )
}
