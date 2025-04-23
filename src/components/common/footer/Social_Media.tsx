import { ISocialMediaLinksProps } from '@/@types/blog/blog.type';
import Link from 'next/link';
import React from 'react';

const Social_Media = ({ links }: ISocialMediaLinksProps) => {
  return (
    <div className='flex gap-3 mt-2'>
      {links.map(({ icon: Icon, href }, index) => (
        <Link
          key={index}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex justify-center items-center p-2 border border-[#345E40] rounded-md w-10 h-10 hover:text-white transition duration-300'
        >
          <Icon
            size={20}
            color='#345E40'
            className='hover:scale-110 transition-transform duration-300'
          />
        </Link>
      ))}
    </div>
  );
};

export default Social_Media;
