import { Button, Card, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import photo from '@/assets/blogDetails/blogID.png';
import { IBlogArticleProps } from '@/@types/blog/blog.type';
const Blog_Card = ({ article }: IBlogArticleProps) => {
  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
      className='w-full max-w-[400px]'
    >
      <Card.Section>
        <Image
          src={photo}
          height={50}
          alt='Blog Related'
          className='rounded-t-md'
          style={{ width: '100%', objectFit: 'cover' }}
        />
      </Card.Section>

      <Stack justify='space-between' mt='md' mb='xs'>
        <Text fw={500} size='sm' c='dimmed'>
          الخميس, 30 مايو 2024
        </Text>
        <Text size='sm' fw={500}>
          {article.title}
        </Text>
      </Stack>

      <Text size='sm' c='dimmed' mb='md' lineClamp={3}>
        {article.brief.slice(0, 50)}...
      </Text>

      <Button color='green' fullWidth radius='md' variant='outline' fw={500}>
        اقرأ المزيد
      </Button>
    </Card>
  );
};

export default Blog_Card;
