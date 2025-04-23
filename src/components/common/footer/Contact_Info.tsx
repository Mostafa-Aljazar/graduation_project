import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
const Contact_Info = () => {
  return (
    <div className='mt-5 text-center'>
      <div className='flex flex-col gap-6 mt-4'>
        <div className='flex items-center gap-4'>
          <Phone size={18} color='#345E40' />
          <Link href='tel:+972595796456'>+972 59-579-6456</Link>
        </div>
        <div className='flex items-center gap-4'>
          <Mail size={18} color='#345E40' />
          <Link href='mailto:AlaqsaCamp@gmail.com'>AlaqsaCamp@gmail.com</Link>
        </div>
        <div className='flex items-center gap-4'>
          <MapPin size={18} color='#345E40' />
          <span>قطاع غزة - فلسطين</span>
        </div>
      </div>
    </div>
  );
};

export default Contact_Info;
