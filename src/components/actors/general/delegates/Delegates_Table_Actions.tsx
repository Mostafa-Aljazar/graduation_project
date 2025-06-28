'use client';

import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { ActionIcon, Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import {
  EllipsisVertical,
  Eye,
  Hammer,
  Speech,
  Trash,
  UserCog,
  UserPen,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentType, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import Call_Delegate_Modal from './modals/Call_Delegate_Modal';
import Delete_Delegate_Modal from './modals/Delete_Delegate_Modal';
import Update_Delegate_Modal from './modals/Update_Delegate_Modal';
import Meeting_Delegate_Modal from './modals/Meeting_Delegate_Modal';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants';

// Define the type for action items
interface ActionItem {
  label: string;
  icon: ComponentType<{ size?: number | string }>;
  action: () => void;
}

interface Props {
  delegate_Id?: number;
  // many
  delegate_Ids?: number[];
  disabled?: boolean;
}

export default function Delegates_Table_Actions({
  delegate_Id,
  delegate_Ids,
  disabled,
}: Props) {
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
  const Manager_General_ACTIONS: ActionItem[] = [
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

  const Manager_Single_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () =>
        router.push(DELEGATE_ROUTES_fUNC(delegate_Id || -1).PROFILE),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: () =>
        router.push(
          DELEGATE_ROUTES_fUNC(delegate_Id || -1).PROFILE +
            `?action=${ACTION_ADD_EDIT_DISPLAY.EDIT}`
        ),
    },
    ...Manager_General_ACTIONS,
  ];

  // for security & delegates
  const Guest_ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () =>
        router.push(DELEGATE_ROUTES_fUNC(delegate_Id || -1).PROFILE),
    },
    {
      label: 'استدعاء',
      icon: Speech,
      action: () => openModal('call'),
    },
  ];

  // Filter actions based on user role
  const ACTIONS: ActionItem[] =
    isManager && delegate_Ids
      ? Manager_General_ACTIONS
      : isManager && delegate_Id
      ? Manager_Single_ACTIONS
      : isDelegate || isSecurity || isSecurityOfficer
      ? Guest_ACTIONS
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

  const IDs = delegate_Ids || (delegate_Id ? [delegate_Id] : []);

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
          {delegate_Ids ? (
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

      {/* Call Details Modal */}
      <Call_Delegate_Modal
        delegateIDs={IDs}
        opened={modalType === 'call'}
        close={closeModal}
      />

      {/* Delete Confirmation Modal */}
      <Delete_Delegate_Modal
        delegateIDs={IDs}
        opened={modalType === 'delete'}
        close={closeModal}
      />

      {/* Update Data Modal */}
      <Update_Delegate_Modal
        delegateIDs={IDs}
        opened={modalType === 'update'}
        close={closeModal}
      />

      {/* Meeting Confirmation Modal */}
      <Meeting_Delegate_Modal
        delegateIDs={IDs}
        opened={modalType === 'meeting'}
        close={closeModal}
      />
    </>
  );
}
