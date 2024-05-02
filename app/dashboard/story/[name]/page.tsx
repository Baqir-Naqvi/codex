'use client';
import Link from 'next/link';
import React from 'react'
const StoriesPage = ({ params }: { params: { name: string }}) => {
  const stories = [
    {
      name: 'The Three Little Pigs and the New Neighbor',
      slug: 'TheThreeLittlePigsandtheNewNeighbor',
      url: 'https://www.youtube.com/embed/3KWwF6dVYPY?si=L2LOhrOWbnJdApbm'
    },
   
  ];

  const findStoryByName = (name: string) => {
    return stories.find(story => story.slug === name);
  };

  // Finding the story based on the name from params
  const foundStory = findStoryByName(params.name);

  return (
    <div className="mt-[180px]">
      {foundStory ? (
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-3xl mb-10 font-bold">{foundStory.name}</h2>
          <iframe
            width="800"
            height="500"
            src={foundStory.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen // Simplified boolean attribute
          ></iframe>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold">
          <div>Story &quot;{params.name}&quot; not found.</div>
          <Link
            href="/dashboard"
            className="bg-slate-100 px-6 py-3 rounded-2xl mt-5"
          >
            Redirect
          </Link>
        </div>
      )}
    </div>
  );
}

export default StoriesPage