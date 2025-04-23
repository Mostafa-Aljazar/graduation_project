import { IBlogArticleProps } from '@/@types/blog/blog.type';
import { List, Text, Title } from '@mantine/core';
import React from 'react';

const Blog_Article = ({ article }: IBlogArticleProps) => {
  return (
    <div className='flex-1 w-full md:w-[60%]'>
      <div style={{ flex: 2 }}>
        <Text c='dimmed' size='sm' mb='xs' fw={400}>
          الخميس, 30 مايو 2024
        </Text>

        <Title order={1} mb='lg' c='#345E40' fw={700}>
          {article.title}
        </Title>

        <article>
          <Text mb='lg' size='md' fw={400}>
            {article.brief}
          </Text>

          <List type='ordered' spacing='xl' size='md' pr='md'>
            {article.lists.map((list) => (
              <List.Item key={list.id} py={5}>
                <strong className='text-2xl'>
                  {list.id}-{list.title}
                </strong>
                <Text size='md' mt='xs' c='dimmed'>
                  {list.text}
                </Text>
              </List.Item>
            ))}
          </List>
        </article>
      </div>
    </div>
  );
};

export default Blog_Article;
