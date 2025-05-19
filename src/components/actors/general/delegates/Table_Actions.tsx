'use client';

import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { ActionIcon, Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import {
  EllipsisVertical,
  Eye,
  Repeat,
  Speech,
  Trash,
  UserCog,
  UserPen,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  action: (id: string | number) => void;
}

type Props = {
  delegate_Id: string | number;
};

export default function Table_Actions({ delegate_Id }: Props) {
  const { isDelegate, isManager, isSecurity, isSecurityOfficer } = useAuth();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [modalType, setModalType] = useState<
    'edit' | 'delete' | 'call' | 'update' | 'meeting' | null
  >(null);

  const router = useRouter();

  // Handlers to open specific modals
  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setOpenedPopover(false); // Close the popover
  };

  const closeModal = () => setModalType(null);

  // Define all possible actions
  const manager_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: (id: string | number) =>
        router.push(DELEGATE_ROUTES_fUNC(id).PROFILE),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: (id: string | number) =>
        router.push(DELEGATE_ROUTES_fUNC(id).PROFILE + '?action=edit'),
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

  // for security & delegates
  const Guest_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: (id: string | number) =>
        router.push(DELEGATE_ROUTES_fUNC(id).PROFILE),
    },
    {
      label: 'استدعاء',
      icon: Speech,
      action: () => openModal('call'),
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
        item.action(delegate_Id);
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
          <ActionIcon
            bg='transparent'
            mt={5}
            onClick={() => setOpenedPopover((o) => !o)}
          >
            <EllipsisVertical size={20} className='mx-auto text-primary' />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown p={0} className='!bg-gray-200 !border-none'>
          <Stack justify='flex-start' gap={0}>
            {Dropdown_Items}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      {/* Delete Confirmation Modal */}
      <Delete_Modal
        delegate_Id={delegate_Id}
        opened={modalType === 'delete'}
        close={closeModal}
      />

      {/* Call Details Modal */}
      <Call_Modal
        delegate_Id={delegate_Id}
        opened={modalType === 'call'}
        close={closeModal}
      />

      {/* Update Data Modal */}
      <Update_Modal
        delegate_Id={delegate_Id}
        opened={modalType === 'update'}
        close={closeModal}
      />

      {/* Meeting Confirmation Modal */}
      <Meeting_Modal
        delegate_Id={delegate_Id}
        opened={modalType === 'meeting'}
        close={closeModal}
      />
    </>
  );
}
