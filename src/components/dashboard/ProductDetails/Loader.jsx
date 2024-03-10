import React from 'react'

function Loader() {
  return (
    <div class="animate-pulse">
        <div className='flex justify-between items-center full gap-x-10'>
      <div class="bg-gray-300 rounded-lg h-44 w-96 mb-4"></div>
      <div class="space-y-3">
        <div class="bg-gray-300 h-6 w-48 rounded"></div>
        <div class="bg-gray-300 h-4 w-32 rounded"></div>
        <div class="bg-gray-300 h-8 w-24 rounded"></div>
        <div class="bg-gray-300 h-4 w-40 rounded mb-4"></div>
        <div class="bg-gray-300 h-10 w-40 rounded"></div>
        <div class="flex justify-between mt-4">
          <div class="bg-gray-300 h-10 w-24 rounded"></div>
          <div class="bg-gray-300 h-10 w-24 rounded"></div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Loader