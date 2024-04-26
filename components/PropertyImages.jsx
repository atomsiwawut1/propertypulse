import Image from "next/image";
import React from 'react';

const PropertyImages = ({ images }) => {
  // Return null if there are no images
  if (!images) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt="Property image"
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`col-span-${images.length === 3 && index === 2 ? '2' : '1'}`}>
                <Image
                  src={image}
                  alt="Property image"
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
