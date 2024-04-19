'use client'
import React, { useState, useEffect } from 'react';
import prev from '@/public/icons/leftCarousel.png';
import next from '@/public/icons/rightCarousel.png';
import Image from 'next/image';

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Change 5000 to desired interval in milliseconds
    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, []);

  return (
    <div className="relative max-w-[1241px] mx-auto mt-4">
        <div className='overflow-hidden'>
        <div className="carousel-container" style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentIndex * 1241}px)` }}>
        {images.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Slide ${index + 1}`}
            width={1241}
            height={439}
          />
        ))}
      </div>
        </div>
    
      <button
        className="absolute top-1/2 left-[-100px] transform -translate-y-1/2 bg-[#E67240] text-white px-6 py-4 rounded-full z-10"
        onClick={goToPrevSlide}
      >
        <Image src={prev} alt='prev'/>
      </button>
      <button
        className="absolute top-1/2 right-[-100px] transform -translate-y-1/2 bg-[#E67240] text-white px-6 py-4 rounded-full z-10"
        onClick={goToNextSlide}
      >
       <Image src={next} alt='next'/>
      </button>
      <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 flex space-x-5 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
