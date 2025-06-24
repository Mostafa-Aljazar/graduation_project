'use client';

import { DELEGATE_ROUTES_fUNC, MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import {
  ActionIcon,
  Button,
  Group,
  Popover,
  Stack,
  ThemeIcon,
} from '@mantine/core';
import { EllipsisVertical, Eye, Trash, Trash2, UserPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useDisclosure } from '@mantine/hooks';
import Aid_Delete_Modal from './aid-delete-modal';
import { ACTION_ADD_EDIT } from '@/constants';

// Define the type for action items
interface ActionItem {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  action: () => void;
}

interface AidActionProps {
  aid_ID: number;
}

export default function Aid_Action({ aid_ID }: AidActionProps) {
  const { user, isDelegate, isManager } = useAuth();
  const [openedPopover, setOpenedPopover] = useState(false);

  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const router = useRouter();

  const manager_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () => router.push(MANAGER_ROUTES_fUNC(user?.id ?? 0, aid_ID).AID),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: () =>
        router.push(
          MANAGER_ROUTES_fUNC(user?.id ?? 0, aid_ID).AID +
            `?action=${ACTION_ADD_EDIT.EDIT}`
        ),
    },
    {
      label: 'حذف',
      icon: Trash,
      action: () => openDelete(),
    },
  ];

  const delegate_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () =>
        router.push(DELEGATE_ROUTES_fUNC(user?.id ?? 0, aid_ID).AID),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: () =>
        router.push(
          DELEGATE_ROUTES_fUNC(user?.id ?? 0, aid_ID).AID + '?action=EDIT'
        ),
    },
  ];

  const ACTIONS: ActionItem[] = isManager
    ? manager_ACTIONS
    : isDelegate
    ? delegate_ACTIONS
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
      fz={16}
      fw={500}
      className={cn(
        '!text-dark !rounded-none',
        index + 1 !== ACTIONS.length && '!border-gray-100 !border-0 !border-b-1'
      )}
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
        item.action();
        setOpenedPopover((o) => !o);
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
            data-click='popover'
            bg='transparent'
            mt={5}
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              setOpenedPopover((o) => !o);
            }}
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

      <Aid_Delete_Modal
        aid_ID={aid_ID}
        opened={openedDelete}
        close={closeDelete}
      />
    </>
  );
}
