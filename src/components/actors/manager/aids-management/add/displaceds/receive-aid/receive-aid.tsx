'use client';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import Receive_Modal from './receive_modal';

type Props = {
  displaced_Id: number;
  aid_Id: number;
  disabled?: boolean;
};

export default function Receive_Aid({
  displaced_Id,
  aid_Id,
  disabled = false,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        type='button'
        variant='light'
        size='xs'
        className='!bg-primary disabled:!bg-primary/75 shadow-xl !text-white'
        onClick={open}
        fw={500}
        fz={16}
        disabled={disabled}
      >
        تسليم
      </Button>
      <Receive_Modal
        close={close}
        opened={opened}
        displaced_Id={displaced_Id}
        aid_Id={aid_Id}
      />
    </>
  );
}
