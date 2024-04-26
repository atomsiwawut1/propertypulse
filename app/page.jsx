import React from 'react'
import Link from 'next/link';
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import connectDB from '@/config/database';
const Homepage = () => {
    
  
    return (
        <>
           <Hero />
           <InfoBoxes />
           <HomeProperties/>
        </>
    );
};

export default Homepage