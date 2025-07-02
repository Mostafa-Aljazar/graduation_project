'use client';

import { Article_SuccessStory_Ad_Response } from '@/@types/common/article-successStories-adsResponse.type';
import { getAd } from '@/actions/actors/general/ads/getAd';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Text,
  Title,
  Image,
  Group,
  Stack,
  Box,
  LoadingOverlay,
  Paper,
  Divider,
  Center,
} from '@mantine/core';
import { StaticImageData } from 'next/image';
import { Carousel } from '@mantine/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface AdContentProps {
  ad_Id: number;
}

export default function Ad_Content({ ad_Id }: AdContentProps) {
  const {
    data: adData,
    isLoading,
    isError,
  } = useQuery<Article_SuccessStory_Ad_Response>({
    queryKey: ['AdContent', ad_Id],
    queryFn: () => getAd({ ad_Id }),
  });

  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const ad = adData?.article_successStory_ad;

  return (
    <Stack pos='relative' p={20}>
      <LoadingOverlay visible={isLoading} zIndex={1000} />

      {isError || !ad ? (
        <Center
          p='xl'
          className='shadow-md border-1 border-gray-300 !rounded-md'
        >
          <Stack>
            <Title order={3} c='red' mb='sm'>
              فشل في تحميل الإعلان
            </Title>
            <Text>{adData?.error || 'حدث خطأ أثناء جلب البيانات'}</Text>
          </Stack>
        </Center>
      ) : (
        <Stack gap='xl'>
          <Group justify='space-between' align='center'>
            <Text fw={600} fz={22}>
              {ad.title}
            </Text>

            <Text size='sm' c='dimmed'>
              نُشر بتاريخ: {new Date(ad.createdAt).toLocaleDateString('ar-EG')}
            </Text>
          </Group>

          {ad.imgs.length > 0 && (
            <Box px={{ base: 0, md: 10 }} w='100%'>
              <Carousel
                slideSize='100%'
                withControls
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                emblaOptions={{ loop: true }}
                classNames={{
                  controls:
                    '!text-black !bg-transparent !px-10 !hidden md:!flex',
                  control: '!bg-second !bg-gray-100',
                }}
                styles={{ root: { width: '100%' } }}
              >
                {ad.imgs.map((img, index) => (
                  <Carousel.Slide key={index}>
                    <Image
                      src={
                        typeof img === 'object' && img !== null && 'src' in img
                          ? (img as StaticImageData).src
                          : (img as string)
                      }
                      alt={ad.title}
                      radius='md'
                      className='mx-auto max-h-[300px] object-fill'
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          )}

          <Divider />

          <div
            className='flex-1 w-full [&>*]:max-w-full prose prose-lg prose-slate'
            dir='rtl'
            dangerouslySetInnerHTML={{ __html: ad.content }}
          />
        </Stack>
      )}
    </Stack>
  );
}
