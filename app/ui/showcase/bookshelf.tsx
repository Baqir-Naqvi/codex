'use client'
import React from 'react'

import Image, { StaticImageData } from 'next/image'
import bookshelfArrow from '@/public/icons/bookshelfArrow.png'
import { useRouter } from 'next/navigation'

interface storiesProps {
  name: string,
  image: string
}

interface bookShelfProps {
    title: string,
    stories: storiesProps[],
}

const BookShelf: React.FC<bookShelfProps> = ({title, stories}) => {
const router = useRouter()

const handleSingleStory =(name:string)=>{
  router.push(`/dashboard/story/${name}`)
}

  return (
    <div className='w-full bg-[#CBE7F4] px-8 py-8 '>
      
        <div className=' w-[1400px] mx-auto '>
            <div className='flex items-center gap-x-5'>
            <p className='text-3xl text-[#55565A] font-bold'>{title}</p><Image src={bookshelfArrow} alt='next-page'/>
            </div>
        
        <div className='flex justify-between mt-10'>
        {stories.map((book, index) => (
          
            <div key={index} className="relative w-40 h-60 cursor-pointer" onClick={(e) => handleSingleStory(book.name)}>
            <Image src={book.image} layout="fill" objectFit="cover" alt={`Book ${index + 1}`} />
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