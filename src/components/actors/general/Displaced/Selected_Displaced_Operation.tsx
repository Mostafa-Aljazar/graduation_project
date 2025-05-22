'use client';

import { cn } from '@/utils/cn';
import { Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import { Hammer, Repeat, Speech, Trash, UserCog, Users } from 'lucide-react';
import React, { useState } from 'react';
import Meeting_Modal from './modals/Meeting_Modal';
import Update_Modal from './modals/Update_Modal';
import Call_Modal from './modals/Call_Modal';
import Delete_Modal from './modals/Delete_Modal';
import useAuth from '@/hooks/useAuth';
import Change_Delegate_Modal from './modals/Chang_Delegate_Modal';

// Define the type for action items
interface ActionItem {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  action: (id: (string | number)[]) => void;
}

type Props = {
  displaced_Ids: (string | number)[];
  disabled: boolean;
};

export default function Selected_Displaced_Operation({
  displaced_Ids,
  disabled,
}: Props) {
  const { isDelegate, isManager, isSecurity, isSecurityOfficer } = useAuth();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [modalType, setModalType] = useState<
    'change_delegate' | 'delete' | 'call' | 'update' | 'meeting' | null
  >(null);

  // Handlers to open specific modals
  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setOpenedPopover(false); // Close the popover
  };

  const closeModal = () => setModalType(null);

  // Define all possible actions
  const manager_delegate_ACTIONS: ActionItem[] = [
    {
      label: 'تغيير المندوب',
      icon: Repeat,
      action: () => openModal('change_delegate'),
    },
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

  // Define all possible actions
  const security_ACTIONS: ActionItem[] = [
    {
      label: 'استدعاء',
      icon: Speech,
      action: () => openModal('call'),
    },
  ];

  // Filter actions based on user role
  const ACTIONS: ActionItem[] =
    isDelegate || isManager
      ? manager_delegate_ACTIONS
      : isSecurity || isSecurityOfficer
      ? security_ACTIONS
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
        item.action(displaced_Ids);
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

      {/* Change Delegate Modal */}
      {(isDelegate || isManager) && (
        <Change_Delegate_Modal
          displaced_Ids={displaced_Ids}
          opened={modalType === 'change_delegate'}
          close={closeModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {(isDelegate || isManager) && (
        <Delete_Modal
          displaced_Ids={displaced_Ids}
          opened={modalType === 'delete'}
          close={closeModal}
        />
      )}

      {/* Call Details Modal */}
      <Call_Modal
        displaced_Ids={displaced_Ids}
        opened={modalType === 'call'}
        close={closeModal}
      />

      {/* Update Data Modal */}
      {(isDelegate || isManager) && (
        <Update_Modal
          displaced_Ids={displaced_Ids}
          opened={modalType === 'update'}
          close={closeModal}
        />
      )}

      {/* Meeting Confirmation Modal */}
      {(isDelegate || isManager) && (
        <Meeting_Modal
          displaced_Ids={displaced_Ids}
          opened={modalType === 'meeting'}
          close={closeModal}
        />
      )}
    </>
  );
}
