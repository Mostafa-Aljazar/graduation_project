'use client';

import { cn } from '@/utils/cn';
import { Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import { Hammer, Speech, Trash, UserCog, Users } from 'lucide-react';
import React, { useState } from 'react';
import Meeting_Modal from './modals/Meeting_Modal';
import Update_Modal from './modals/Update_Modal';
import Call_Modal from './modals/Call_Modal';
import Delete_Modal from './modals/Delete_Modal';
import useAuth from '@/hooks/useAuth';

// Define the type for action items
interface ActionItem {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  action: (id: (string | number)[]) => void;
}

type Props = {
  delegate_Ids: (string | number)[];
  disabled: boolean;
};

export default function Selected_Delegates_Operation({
  delegate_Ids,
  disabled,
}: Props) {
  const { isDelegate, isManager, isSecurity, isSecurityOfficer } = useAuth();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [modalType, setModalType] = useState<
    'delete' | 'call' | 'update' | 'meeting' | null
  >(null);

  // Handlers to open specific modals
  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setOpenedPopover(false); // Close the popover
  };

  const closeModal = () => setModalType(null);

  // Define all possible actions
  const manager_ACTIONS: ActionItem[] = [
    {
      label: 'حذف',
      icon: Trash,
      action: () => openModal('delete'),
    },
    {
      label: 'استدعاء',
      icon: Speech,
      action: () => openModal('call'),
    },
    {
      label: 'تحديث بيانات',
      icon: UserCog,
      action: () => openModal('update'),
    },
    {
      label: 'اجتماع',
      icon: Users,
      action: () => openModal('meeting'),
    },
  ];

  // for security & delegates & SecurityOfficer
  const Guest_ACTIONS: ActionItem[] = [
    {
      label: 'استدعاء',
      icon: Speech,
      action: () => openModal('call'),
    },
    {
      label: 'اجتماع',
      icon: Users,
      action: () => openModal('meeting'),
    },
  ];

  // Filter actions based on user role
  const ACTIONS: ActionItem[] = isManager
    ? manager_ACTIONS
    : isDelegate || isSecurity || isSecurityOfficer
    ? Guest_ACTIONS
    : [];

  const Dropdown_Items = ACTIONS.map((item, index) => (
    <Button
      justify='flex-start'
      key={item.label}
      leftSection={
        <ThemeIcon variant='transparent' className='!text-dark'>
          <item.icon size={18} />
        </ThemeIcon>
      }
      p={0}
      bg='transparent'
      fz={17}
      fw={600}
      className={cn(
        '!text-dark !rounded-none',
        index + 1 !== ACTIONS.length && '!border-gray-100 !border-0 !border-b-1'
      )}
      onClick={() => {
        item.action(delegate_Ids);
      }}
    >
      {item.label}
    </Button>
  ));

  return (
    <>
      <Popover
        width={130}
        opened={openedPopover}
        onChange={setOpenedPopover}
        position='left-start'
        withArrow
        arrowPosition='center'
        arrowSize={12}
        arrowRadius={3}
        arrowOffset={10}
        classNames={{ arrow: '!border-none' }}
      >
        <Popover.Target>
          <Button
            type='button'
            w={120}
            size='sm'
            px={15}
            fz={16}
            fw={500}
            c={'white'}
            radius={'lg'}
            className='!justify-end !items-end !self-end !bg-primary !shadow-lg'
            rightSection={<Hammer size={15} />}
            disabled={disabled}
            onClick={() => setOpenedPopover((o) => !o)}
          >
            العمليات
          </Button>
        </Popover.Target>

        <Popover.Dropdown p={0} className='!bg-gray-200 !border-none'>
          <Stack justify='flex-start' gap={0}>
            {Dropdown_Items}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      {/* Delete Confirmation Modal */}
      <Delete_Modal
        delegate_Ids={delegate_Ids}
        opened={modalType === 'delete'}
        close={closeModal}
      />

      {/* Call Details Modal */}
      <Call_Modal
        delegate_Ids={delegate_Ids}
        opened={modalType === 'call'}
        close={closeModal}
      />

      {/* Update Data Modal */}
      <Update_Modal
        delegate_Ids={delegate_Ids}
        opened={modalType === 'update'}
        close={closeModal}
      />

      {/* Meeting Confirmation Modal */}
      <Meeting_Modal
        delegate_Ids={delegate_Ids}
        opened={modalType === 'meeting'}
        close={closeModal}
      />
    </>
  );
}
