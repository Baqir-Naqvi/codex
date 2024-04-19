import React from 'react'

import Image, { StaticImageData } from 'next/image'
import bookshelfArrow from '@/public/icons/bookshelfArrow.png'

interface bookShelfProps {
    title: string,
    images: StaticImageData[],
}

const BookShelf: React.FC<bookShelfProps> = ({title, images}) => {

  return (
    <div className='w-full bg-[#CBE7F4] px-8 py-8 '>
      
        <div className=' w-[1400px] mx-auto '>
            <div className='flex items-center gap-x-5'>
            <p className='text-3xl text-[#55565A] font-bold'>{title}</p><Image src={bookshelfArrow} alt='next-page'/>
            </div>
        
        <div className='flex justify-between mt-10'>
        {images.map((book, index) => (
            <div key={index} className="relative w-40 h-60">
            <Image src={book} layout="fill" objectFit="cover" alt={`Book ${index + 1}`} />
          </div>
        ))}
        </div>
       
        </div>
        <div className='bg-white shadow-2xl w-[1500px] h-[20px] mx-auto rounded-sm'>

        </div>

    </div>
  )
}

export default BookShelf