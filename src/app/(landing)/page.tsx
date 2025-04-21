import { Button, Stack } from '@mantine/core';

export default function Home() {
  return (
    <Stack
      pt={60}
      className='xs:bg-red-500 md:bg-second w-full h-screen text-third'
    >
      <Button w={100}>HOME</Button>
    </Stack>
  );
}
