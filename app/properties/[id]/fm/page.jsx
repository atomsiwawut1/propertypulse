'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from 'react'
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import ModelViewer from "@/components/ModelViewr";


const FMPage = () => {

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
                <PropertyHeaderImage image={property.images[1]} />
            </>)}

            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>
            </section>

            <section className=" bg-green-50">
                <div className="container m-auto py-10 px-6">
                    <div className="flex justify-center items-center w-full" style={{ height: '650px' }}>

                        <ModelViewer />


                        {/*<!-- Sidebar -->*/}
                        <aside className="space-y-4">
                            <button>555</button>

                            {/*!<-- Contact Form --> */}
                        
                            <div className="container m-auto py-6 px-6">

                            </div>
                        </aside>


                    </div>
                </div>
            </section>


        </>

    );
};

export default FMPage