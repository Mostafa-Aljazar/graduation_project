'use client';

import { getStory } from '@/actions/landing/success-stories/getStory';
import formatDateInArabic from '@/utils/formatDateInArabic';
import {
  Box,
  Container,
  Loader,
  Text,
  Paper,
  Image,
  Group,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

type Props = { story_Id: number };

const Success_Story = ({ story_Id }: Props) => {
  const {
    data: story,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['story', story_Id],
    queryFn: () => getStory(story_Id),
  });

  if (isLoading) {
    return <Loader mx='auto' mt='100' size='xl' color='green' />;
  }

  if (error) {
    return (
      <Text color='red' size='lg' ta='center' mt={50}>
        حدث خطأ: {error.message}
      </Text>
    );
  }

  if (!story) return null;

  return (
    <Container size='xl' py='xl'>
      <Paper shadow='xl' radius='lg' withBorder>
        {/* Date Section */}
        <Box
          p='xl'
          style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
        >
          <Group justify='space-between' align='center'>
            <Text size='sm' c='dimmed'>
              {story.article_successStory_ad?.createdAt instanceof Date
                ? formatDateInArabic(story.article_successStory_ad?.createdAt)
                : story.article_successStory_ad?.createdAt}
            </Text>
          </Group>
        </Box>

        {/* Title and Image Section */}
        <Box p='xl'>
          <Box className='flex flex-col items-start gap-6'>
            <Text
              fw={600}
              fz={20}
              c='#000'
              className='pb-6 border-[#345E40] border-b-4 text-gray-800 text-4xl text-start'
            >
              {story.article_successStory_ad?.title}
            </Text>

            {/* Hero Image Section */}
            <Box className='!w-[300px] aspect-[3/2]'>
              <Image
                src={story.article_successStory_ad?.imgs[0]}
                alt={story.article_successStory_ad?.title}
                w={300}
                h='auto'
                fit='cover'
                style={{
                  borderRadius: '10px',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Content Section */}
        <Box p='xl'>
          <Box
            className='max-w-none prose prose-lg'
            dangerouslySetInnerHTML={{
              __html: story.article_successStory_ad?.content as string,
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Success_Story;
