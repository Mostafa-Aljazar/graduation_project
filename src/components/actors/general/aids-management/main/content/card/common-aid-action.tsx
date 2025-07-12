'use client';

import { DELEGATE_ROUTES_fUNC, MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { ActionIcon, Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import { EllipsisVertical, Eye, Trash, UserPen, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useDisclosure } from '@mantine/hooks';
import Common_Aid_Delete_Modal from './common-aid-delete-modal';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { DISTRIBUTION_MECHANISM } from '@/content/actor/manager/aids-management';

interface ActionItem {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  action: () => void;
}

interface CommonAidActionProps {
  aid_Id: number;
  aid_distribution_mechanism: DISTRIBUTION_MECHANISM;
  actor_Id: number;
  role: Exclude<
    (typeof USER_TYPE)[UserType],
    | typeof USER_TYPE.SECURITY_OFFICER
    | typeof USER_TYPE.DISPLACED
    | typeof USER_TYPE.SECURITY
  >;
}

export default function Common_Aid_Action({
  aid_Id,
  aid_distribution_mechanism,
  actor_Id,
  role,
}: CommonAidActionProps) {
  const { user, isManager, isDelegate } = useAuth();
  const router = useRouter();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const isOwner = actor_Id === user?.id;

  const routeFunc =
    role === USER_TYPE.MANAGER
      ? MANAGER_ROUTES_fUNC(actor_Id, aid_Id)
      : DELEGATE_ROUTES_fUNC(actor_Id, aid_Id);

  const baseActions: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () => router.push(routeFunc.AID),
    },
  ];

  const editableActions: ActionItem[] = [
    {
      label: 'تعديل',
      icon: UserPen,
      action: () =>
        router.push(`${routeFunc.AID}?action=${ACTION_ADD_EDIT_DISPLAY.EDIT}`),
    },
  ];

  const addDisplacedsActions: ActionItem[] = [
    {
      label: 'إضافة نازحين',
      icon: UserPlus,
      action: () =>
        router.push(DELEGATE_ROUTES_fUNC(actor_Id, aid_Id).ADD_AID_DISPLACEDS),
    },
  ];

  const deletableActions: ActionItem[] = [
    {
      label: 'حذف',
      icon: Trash,
      action: openDelete,
    },
  ];

  const ACTIONS: ActionItem[] = (() => {
    if (role === USER_TYPE.MANAGER && isManager && isOwner)
      return [...baseActions, ...editableActions, ...deletableActions];

    if (role === USER_TYPE.MANAGER && isManager && !isOwner) return baseActions;

    if (
      role === USER_TYPE.DELEGATE &&
      isDelegate &&
      isOwner &&
      aid_distribution_mechanism == DISTRIBUTION_MECHANISM.delegates_lists
    )
      return [...baseActions, ...addDisplacedsActions];

    return baseActions;
  })();

  return (
    <>
      <Popover
        // width={130}

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
            onClick={(e) => {
              e.stopPropagation();
              setOpenedPopover((o) => !o);
            }}
          >
            <EllipsisVertical size={20} className='text-primary' />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown p={0} className='!bg-gray-200 !border-none'>
          <Stack gap={0}>
            {ACTIONS.map((item, index) => (
              <Button
                key={index}
                justify='flex-start'
                px={10}
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
                  index + 1 !== ACTIONS.length &&
                    '!border-gray-100 !border-0 !border-b-1'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                  setOpenedPopover(false);
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      <Common_Aid_Delete_Modal
        aid_Id={aid_Id}
        opened={openedDelete}
        close={closeDelete}
      />
    </>
  );
}
