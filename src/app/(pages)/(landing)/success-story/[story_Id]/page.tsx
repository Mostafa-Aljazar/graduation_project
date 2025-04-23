// TODO: fisal do this , it is like blog page

import { Stack } from '@mantine/core';

export default async function Page({
  params,
}: {
  params: Promise<{ story_Id: string }>;
}) {
  const { story_Id } = await params;
  return <Stack pt={60}>My Post: {story_Id}</Stack>;
}
