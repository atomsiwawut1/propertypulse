'use client';
import React from 'react'
import Cliploader from "react-spinners/ClipLoader";
const override={display:'block',
                    margin: '100px auto'};
const LoadingPage = ({loading}) => {
  return (
    <Cliploader
        color='#3b82f6'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid="loader"
    
    />
  )
}

export default LoadingPage