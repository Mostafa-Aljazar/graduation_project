import { Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useState } from 'react';
import Contact_Info from './footer/Contact_Info';
import Copy_Right from './footer/Copy_Right';
import Social_Media from './footer/Social_Media';
import Contact_Form from './footer/Contact_Form';
import { socialLinks } from '@/content/blog';
export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [status, setStatus] = useState('');

  const handleSubmit = async (values: any) => {
    const res = await fetch('/api-path', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error('Failed to send message.');
  };
  if (isMobile) {
    return (
      <div className='bg-white py-11 w-full'>
        <div className='flex flex-col items-start gap-8'>
          <div className='flex flex-col flex-1 items-center p-5'>
            <div className='flex flex-col items-start w-full'>
              <Text mb='lg' c='#345E40' fw={700} size='xl'>
                تواصل معنا
              </Text>
              <Text size='md' mt='xs' c='#000' ta='start'>
                نحن هنا لخدمتك! إذا كنت بحاجة إلى مزيد من المعلومات عن مؤسستنا
                أو لديك أي استفسارات بشأن كيفية تقديم الدعم والمساعدة، لا تتردد
                في التواصل معنا.
              </Text>
            </div>
            <div className='flex-1 bg-[#EDEEF7] p-10 rounded-md w-full'>
              <Contact_Form
                onSubmit={handleSubmit}
                status={status}
                setStatus={setStatus}
              />
            </div>
            <div className='flex flex-col flex-1 items-center p-5'>
              <Text mb='xl' c='#345E40' fw={700} size='xl'>
                تواصل معنا
              </Text>
              <Text size='lg' mt='xs' c='#000' ta='start'>
                نحن هنا لخدمتك! إذا كنت بحاجة إلى مزيد من المعلومات عن مؤسستنا
                أو لديك أي استفسارات بشأن كيفية تقديم الدعم والمساعدة، لا تتردد
                في التواصل معنا.
              </Text>
              <Social_Media links={socialLinks} />
              <Contact_Info />
              <Copy_Right />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-11 w-full`}>
      <div
        className={`flex 
          md:flex-row
        items-start gap-8`}
      >
        <div className='flex flex-col flex-1 items-center p-5'>
          <Text mb='xl' c='#345E40' fw={700} size='xl'>
            تواصل معنا
          </Text>
          <Text size='lg' mt='xs' c='#000' ta='start'>
            نحن هنا لخدمتك! إذا كنت بحاجة إلى مزيد من المعلومات عن مؤسستنا أو
            لديك أي استفسارات بشأن كيفية تقديم الدعم والمساعدة، لا تتردد في
            التواصل معنا.
          </Text>
          <Social_Media links={socialLinks} />
          <Contact_Info />
          <Copy_Right />
        </div>
        <div className='flex-1 bg-[#EDEEF7] p-10 rounded-md w-full'>
          <Contact_Form
            onSubmit={handleSubmit}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </div>
    </div>
  );
}
