'use client';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import Receive_Modal from './receive_modal';

type Props = {
  displaced_Id: number;
  aid_id: number;
};

export default function Receive_Aid({ displaced_Id, aid_id }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        type='button'
        variant='light'
        size='sm'
        className='!bg-primary shadow-xl !text-white'
        onClick={open}
        fw={600}
      >
        تسليم
      </Button>
      <Receive_Modal
        close={close}
        opened={opened}
        displaced_Id={displaced_Id}
        aid_id={aid_id}
      />
    </>
  );
}
