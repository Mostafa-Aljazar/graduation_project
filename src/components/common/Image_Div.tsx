import React from 'react';
import blogPhoto from '@/assets/blogDetails/blogPhoto.png';
import Image from 'next/image';

const Image_Div = () => {
  return (
    <div className='relative w-full h-[50vh] overflow-hidden'>
        
      <Image
        alt='النزوح يسرق الطفولة، لكنه لا يستطيع قتل البراءة'
        src={blogPhoto}
        fill
        sizes='100vw'
        className='w-full h-full object-cover'
      />
         {/* Overlay */}  
      <div className='top-0 left-0 z-10 absolute bg-black/70 w-full h-full' />
        {/* Text */}  
      <p className='top-8 left-1/2 z-20 absolute px-4 font-bold text-white text-xl sm:text-2xl md:text-3xl text-center leading-relaxed -translate-x-1/2 transform'>
            النزوح <span className='text-[#F60A0A]'>يسرق</span> الطفولة،
        لكنه لا يستطيع <span className='text-[#F60A0A]'>قتل </span>
        البراءة   
      </p>
       
    </div>
  );
};

export default Image_Div;
