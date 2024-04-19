import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import banner1 from '@/public/banners/banner1.png';
import banner2 from '@/public/banners/banner2.png';
import Carousel from '@/app/ui/carousel';
import BookShelf from '@/app/ui/showcase/bookshelf';

import Dinosaur from '@/public/books/Dinosaur.png'
import Legs from '@/public/books/Legs.png'
import OwnBackyard from '@/public/books/Own Backyard.png'
import Sigfrid from '@/public/books/Sigfrid.png'
import Threepig from '@/public/books/threepig.png'
import { title } from 'process';

export default async function Page() {
 const banners = [
  banner1.src,banner2.src
 ]

 const popularStories = [
  {
    name: 'Dinosor',
    image: Dinosaur.src,
  },{
    name: 'Legs',
    image: Legs.src,
  },
  {
    name: 'OwnBackyeard',
    image: OwnBackyard.src,
  },{
    name: 'Sigfrid',
    image: Sigfrid.src,
  },
  {
    name: 'TheThreeLittlePigsandtheNewNeighbor',
    image: Threepig.src
  }
 ]
  return (
    <main>
        <div className='max-w-[1241px] mx-auto mt-[150px]'>
            <h1 className='mt-4 text-5xl font-extrabold'>Hello, Zarah</h1>
        </div>
      <div>
      <Carousel images={banners}/>
      </div>
      <div className='mt-[100px]'>
      <BookShelf title={'Popular on Sign Story'}  stories={popularStories}/>
      <BookShelf title={'Classic Stories'} stories={popularStories}/>
      <BookShelf title={'Fanatasy Stories'} stories={popularStories}/>
      </div>
  
    </main>
  );
}
