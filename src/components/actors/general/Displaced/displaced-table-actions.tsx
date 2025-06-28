'use client';

import { DISPLACED_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { ActionIcon, Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import {
  EllipsisVertical,
  Eye,
  Hammer,
  Repeat,
  Speech,
  Trash,
  UserCog,
  UserPen,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants';
import Delete_Displaced_Modal from './modals/Delete_Displaced_Modal';
import Call_Displaced_Modal from './modals/Call_Displaced_Modal';
import Update_Displaced_Modal from './modals/Update_Displaced_Modal';
import Meeting_Displaced_Modal from './modals/Meeting_Displaced_Modal';
import Change_Delegate_In_Displaced_Modal from './modals/Change_Delegate_In_Displaced_Modal';

// Define the type for action items
interface ActionItem {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  action: () => void;
}

interface Props {
  displaced_ID?: number;
  // many
  displaced_IDs?: number[];
  disabled?: boolean;
}

export default function Displaced_Table_Actions({
  displaced_ID,
  displaced_IDs,
  disabled,
}: Props) {
  const { isDelegate, isManager, isSecurity, isSecurityOfficer } = useAuth();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [modalType, setModalType] = useState<
    'change_delegate' | 'edit' | 'delete' | 'call' | 'update' | 'meeting' | null
  >(null);

  const router = useRouter();

  // Handlers to open specific modals
  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setOpenedPopover(false); // Close the popover
  };

  const closeModal = () => setModalType(null);

  const Admin_General_ACTIONS: ActionItem[] = [
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

  const Manager_General_ACTIONS: ActionItem[] = [
    ...Admin_General_ACTIONS,
    {
      label: 'تغيير المندوب',
      icon: Repeat,
      action: () => openModal('change_delegate'),
    },
  ];

  const Manager_Single_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () =>
        router.push(DISPLACED_ROUTES_fUNC(displaced_ID || -1).PROFILE),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: () =>
        router.push(
          DISPLACED_ROUTES_fUNC(displaced_ID || -1).PROFILE +
            `?action=${ACTION_ADD_EDIT_DISPLAY.EDIT}`
        ),
    },
    ...Manager_General_ACTIONS,
  ];

  const Delegate_Single_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () =>
        router.push(DISPLACED_ROUTES_fUNC(displaced_ID || -1).PROFILE),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: () =>
        router.push(
          DISPLACED_ROUTES_fUNC(displaced_ID || -1).PROFILE +
            `?action=${ACTION_ADD_EDIT_DISPLAY.EDIT}`
        ),
    },
    ...Admin_General_ACTIONS,
  ];

  const Security_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () =>
        router.push(DISPLACED_ROUTES_fUNC(displaced_ID || 0).PROFILE),
    },

    {
      label: 'استدعاء',
      icon: Speech,
      action: () => openModal('call'),
    },
  ];

  // Filter actions based on user role
  const ACTIONS: ActionItem[] =
    isManager && displaced_IDs
      ? Manager_General_ACTIONS
      : isManager && displaced_ID
      ? Manager_Single_ACTIONS
      : isDelegate && displaced_IDs
      ? Admin_General_ACTIONS
      : isDelegate && displaced_ID
      ? Delegate_Single_ACTIONS
      : isSecurity || isSecurityOfficer
      ? Security_ACTIONS
      : [];

  const Dropdown_Items = ACTIONS.map((item, index) => (
    <Button
      justify='flex-start'
      key={item.label}
      leftSection={
        <ThemeIcon variant='transparent' className='!text-dark'>
          <item.icon size={16} />
        </ThemeIcon>
      }
      p={0}
      bg='transparent'
      fz={16}
      fw={500}
      className={cn(
        '!text-dark !rounded-none hover:!bg-second-light',
        index + 1 !== ACTIONS.length && '!border-gray-100 !border-0 !border-b-1'
      )}
      onClick={() => {
        item.action();
      }}
    >
      {item.label}
    </Button>
  ));
  const IDs = displaced_IDs || (displaced_ID ? [displaced_ID] : []);

  return (
    <>
      <Popover
        width={150}
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
          {displaced_IDs ? (
            <Button
              type='button'
              w={130}
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
          ) : (
            <ActionIcon
              bg='transparent'
              mt={5}
              onClick={() => setOpenedPopover((o) => !o)}
            >
              <EllipsisVertical size={20} className='mx-auto text-primary' />
            </ActionIcon>
          )}
        </Popover.Target>

        <Popover.Dropdown p={0} className='!bg-gray-200 !border-none'>
          <Stack justify='flex-start' gap={0}>
            {Dropdown_Items}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      {/* Change Delegate Modal */}
      {(isDelegate || isManager) && (
        <Change_Delegate_In_Displaced_Modal
          displacedIDs={IDs}
          opened={modalType === 'change_delegate'}
          close={closeModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {(isDelegate || isManager) && (
        <Delete_Displaced_Modal
          displacedIDs={IDs}
          opened={modalType === 'delete'}
          close={closeModal}
        />
      )}

      {/* Call Details Modal */}
      <Call_Displaced_Modal
        displacedIDs={IDs}
        opened={modalType === 'call'}
        close={closeModal}
      />

      {/* Update Data Modal */}
      {(isDelegate || isManager) && (
        <Update_Displaced_Modal
          displacedIDs={IDs}
          opened={modalType === 'update'}
          close={closeModal}
        />
      )}

      {/* Meeting Confirmation Modal */}
      {(isDelegate || isManager) && (
        <Meeting_Displaced_Modal
          displacedIDs={IDs}
          opened={modalType === 'meeting'}
          close={closeModal}
        />
      )}
    </>
  );
}
