'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from 'react'
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from 'next/link';
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContractForm from "@/components/PropertyContractForm";

const PropertyPage = () => {

    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return;
            try {
                const property = await fetchProperty(id);
                setProperty(property);
            } catch (error) {
                console.error("Error Fectch property", error);
            } finally {
                setLoading(false);
            }
        }

        if (property === null)
            fetchPropertyData();

    }, [id, property]);

    if (!property && !loading) {

        return (
            <h1 className="text-center text-2xl font-bold mt-10">

                Property Not Found

            </h1>
        )
    }

    return (
        <>

            {loading && <Spinner loading={loading} />}
            {!loading && property && (<>
                <PropertyHeaderImage image={property.images[0]} />
            </>)}

            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-green-500 hover:text-green-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>
            </section>

            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">


                        <PropertyDetails property={property} />

                        {/*<!-- Sidebar -->*/}
                        <aside className="space-y-4">
                            <BookmarkButton property={property} />
                            {property && <ShareButtons property={property} />}  {/* Ensure property exists before rendering */}

                            {/*!<-- Contact Form --> */}
                            <PropertyContractForm property={property} />
                            <div className="container m-auto py-6 px-6">
                                <Link
                                    href={`/properties/${id}/fm`}
                                    className="text-green-500 hover:text-green-600 flex items-center"
                                >
                                    <FaArrowRight className="mr-2" /> Facilities Management 
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            {property && property.images && (
                <PropertyImages images={property.images} />
            )}

        </>

    );
};

export default PropertyPage