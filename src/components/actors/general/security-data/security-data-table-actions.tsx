'use client';

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
import { SECURITY_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import Delete_Security_Members_Modal from './modals/delete-security-members-modal';
import Call_Security_Members_Modal from './modals/call-security-members-modal';
import Meeting_Security_Members_Modal from './modals/meeting-security-members-modal';
import Update_Security_Members_Modal from './modals/update-security-members-modal';
import { ACTION_ADD_EDIT_DISPLAY } from '@/@types/actors/common-types/index.type';

interface ActionItem {
  label: string;
  icon: ComponentType<{ size?: number | string }>;
  action: () => void;
}

interface Props {
  security_Id?: number;
  security_Ids?: number[];
  disabled?: boolean;
}

export default function Security_Data_Table_Actions({
  security_Id,
  security_Ids,
  disabled,
}: Props) {
  const { isManager, isSecurity, isSecurityOfficer } = useAuth();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [modalType, setModalType] = useState<
    'edit' | 'delete' | 'call' | 'update' | 'meeting' | null
  >(null);

  const router = useRouter();

  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setOpenedPopover(false);
  };

  const closeModal = () => setModalType(null);

  const buildRoute = (id: number, edit = false) => {
    const base = SECURITY_ROUTES_fUNC({ security_Id: id });
    return edit ? `${base.PROFILE}?action=${ACTION_ADD_EDIT_DISPLAY.EDIT}` : base.PROFILE;
  };

  const commonActions: ActionItem[] = [
    { label: 'حذف', icon: Trash, action: () => openModal('delete') },
    { label: 'استدعاء', icon: Speech, action: () => openModal('call') },
    { label: 'تحديث بيانات', icon: UserCog, action: () => openModal('update') },
    { label: 'اجتماع', icon: Users, action: () => openModal('meeting') },
  ];

  const viewEditActions: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () => router.push(buildRoute(security_Id || 0)),
    },
    {
      label: 'تعديل',
      icon: UserPen,
      action: () => router.push(buildRoute(security_Id || 0, true)),
    },
  ];

  const getActions = (): ActionItem[] => {
    if ((isManager || isSecurityOfficer) && security_Ids) return [...commonActions];
    if ((isManager || isSecurityOfficer) && security_Id)
      return [...viewEditActions, ...commonActions];
    return [];
  };

  const ACTIONS = getActions();
  const IDs = security_Ids || (security_Id ? [security_Id] : []);

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
          {security_Ids ? (
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
            <ActionIcon bg='transparent' mt={5} onClick={() => setOpenedPopover((o) => !o)}>
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

      <Delete_Security_Members_Modal
        security_Ids={IDs}
        opened={modalType === 'delete'}
        close={closeModal}
      />

      <Call_Security_Members_Modal
        security_Ids={IDs}
        opened={modalType === 'call'}
        close={closeModal}
      />

      <Update_Security_Members_Modal
        security_Ids={IDs}
        opened={modalType === 'update'}
        close={closeModal}
      />

      <Meeting_Security_Members_Modal
        security_Ids={IDs}
        opened={modalType === 'meeting'}
        close={closeModal}
      />
    </>
  );
}
