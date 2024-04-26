import React from 'react';
import Link from 'next/link'; 
//import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';


import { fetchProperties } from '@/utils/request';


const PropertiesPage = async () => {
    const properties = await fetchProperties();

    // Sort properties by date

    properties.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} /> // Make sure each property has a unique 'id'.
                    ))}
                </div>)}

            </div>
        </section>
    );
};

export default PropertiesPage;