"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/request';

const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const getProperties = async () => {
            try {
                const fetchedProperties = await fetchProperties();
                // Assuming 'createAt' is correctly provided in your property objects
                fetchedProperties.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
                setProperties(fetchedProperties);
            } catch (error) {
                console.error('Failed to fetch properties:', error);
                // Optionally, handle errors, for example, by setting an error state
            }
        };

        getProperties();
    }, []); // Empty dependency array means this effect runs once after the initial rendering

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} /> // Ensure each property has a unique '_id'
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PropertiesPage;
