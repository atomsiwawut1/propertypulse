import React from 'react'
import Link from 'next/link';
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const Homepage = () => {
    
  
    return (
        <>
           <Hero />
           <InfoBoxes />
           <FeaturedProperties />
           <HomeProperties/>
        </>
    );
};

export default Homepage