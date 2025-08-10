'use client';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Common_Receive_Displaced_Aid_Modal from './common-receive_displaced-aid-modal';

interface CommonReceiveDisplacedAidProps {
  displaced_Id: number;
  aid_Id: number;
  disabled?: boolean;
}

export default function Common_Receive_Displaced_Aid({
  displaced_Id,
  aid_Id,
  disabled = false,
}: CommonReceiveDisplacedAidProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        size='xs'
        type='submit'
        className='!bg-primary !shadow-md'
        onClick={open}
        fw={300}
        fz={14}
        disabled={disabled}
      >
        تسليم
      </Button>
      <Common_Receive_Displaced_Aid_Modal
        close={close}
        opened={opened}
        displaced_Id={displaced_Id}
        aid_Id={aid_Id}
      />
    </>
  );
}
