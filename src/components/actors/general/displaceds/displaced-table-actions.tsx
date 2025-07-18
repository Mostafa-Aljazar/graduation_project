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
import Delete_Displaced_Modal from './modals/delete-displaced-modal';
import Call_Displaced_Modal from './modals/call-displaceds-modal';
import Update_Displaced_Modal from './modals/update-displaced-modal';
import Meeting_Displaced_Modal from './modals/meeting-displaced-modal';
import Change_Delegate_In_Displaced_Modal from './modals/change-delegate-in-displaceds-modal';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';

// Define the type for action items
interface ActionItem {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  action: () => void;
}

interface DisplacedTableActionsProps {
  displaced_Id?: number;
  // many
  displaced_Ids?: number[];
  disabled?: boolean;
}

export default function Displaced_Table_Actions({
  displaced_Id,
  displaced_Ids,
  disabled,
}: DisplacedTableActionsProps) {
  const { isDelegate, isManager, isSecurity, isSecurityOfficer } = useAuth();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [modalType, setModalType] = useState<
    'change_delegate' | 'edit' | 'delete' | 'call' | 'update' | 'meeting' | null
  >(null);

  const router = useRouter();

  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setOpenedPopover(false); // Close the popover
  };

  const closeModal = () => setModalType(null);

  const buildRoute = (id: number, edit = false) => {
    const base = DISPLACED_ROUTES_fUNC(id);
    return edit
      ? `${base.PROFILE}?action=${ACTION_ADD_EDIT_DISPLAY.EDIT}`
      : base.PROFILE;
  };

  const commonActions: ActionItem[] = [
    { label: 'حذف', icon: Trash, action: () => openModal('delete') },
    { label: 'استدعاء', icon: Speech, action: () => openModal('call') },
    { label: 'تحديث بيانات', icon: UserCog, action: () => openModal('update') },
    { label: 'اجتماع', icon: Users, action: () => openModal('meeting') },
  ];

  const managerExtras: ActionItem[] = [
    {
      label: 'تغيير المندوب',
      icon: Repeat,
      action: () => openModal('change_delegate'),
    },
  ];

  const viewEditActions: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () => router.push(buildRoute(displaced_Id || 0)),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: () => router.push(buildRoute(displaced_Id || 0, true)),
    },
  ];

  const securityActions: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () => router.push(buildRoute(displaced_Id || 0)),
    },
    { label: 'استدعاء', icon: Speech, action: () => openModal('call') },
  ];

  const getActions = (): ActionItem[] => {
    if (isManager && displaced_Ids) return [...commonActions, ...managerExtras];
    if (isManager && displaced_Id)
      return [...viewEditActions, ...commonActions, ...managerExtras];
    if (isDelegate && displaced_Ids) return [...commonActions];
    if (isDelegate && displaced_Id)
      return [...viewEditActions, ...commonActions];
    if (isSecurity || isSecurityOfficer) return securityActions;
    return [];
  };

  const ACTIONS = getActions();
  const IDs = displaced_Ids || (displaced_Id ? [displaced_Id] : []);

  const Dropdown_Items = ACTIONS.map((item, index) => (
    <Button
      key={item.label}
      justify='flex-start'
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
        'hover:!bg-second-light !rounded-none !text-dark',
        index + 1 !== ACTIONS.length && '!border-gray-100 !border-0 !border-b-1'
      )}
      onClick={item.action}
    >
      {item.label}
    </Button>
  ));

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
          {displaced_Ids ? (
            <Button
              type='button'
              w={130}
              size='sm'
              px={15}
              fz={16}
              fw={500}
              c='white'
              radius='md'
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

      {isManager && (
        <Change_Delegate_In_Displaced_Modal
          displacedIds={IDs}
          opened={modalType === 'change_delegate'}
          close={closeModal}
        />
      )}

      {(isDelegate || isManager) && (
        <Delete_Displaced_Modal
          displacedIds={IDs}
          opened={modalType === 'delete'}
          close={closeModal}
        />
      )}

      <Call_Displaced_Modal
        displacedIds={IDs}
        opened={modalType === 'call'}
        close={closeModal}
      />

      {(isDelegate || isManager) && (
        <Update_Displaced_Modal
          displacedIds={IDs}
          opened={modalType === 'update'}
          close={closeModal}
        />
      )}

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
