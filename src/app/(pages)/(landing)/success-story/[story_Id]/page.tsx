// TODO: fisal do this , it is like blog page

import Footer from '@/components/common/Footer';
import Success_Stories from '@/components/home/Success_Stories_Landing';
import Success_Story from '@/components/home/Success_Story';
import { Stack } from '@mantine/core';

export default async function Page({
  params,
}: {
  params: Promise<{ story_Id: string }>;
}) {
  const { story_Id } = await params;
  return (
    <>
      <Stack pt={60}>
        {/* My Post: {story_Id} */}
        <Success_Story story_Id={story_Id} />
      </Stack>
      <Footer />
    </>
  );
}
