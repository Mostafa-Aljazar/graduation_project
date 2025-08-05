'use client';

import { ActionIcon, Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit, Eye, Trash } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import Delete_Ad_Article_Story_Modal from './delete-ad-story-article-modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ACTION_ADD_EDIT_DISPLAY,
  TYPE_WRITTEN_CONTENT,
} from '@/@types/actors/common-types/index.type';
import { USER_RANK, UserRank } from '@/constants/userTypes';

interface ActionItem {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  action: () => void;
}

interface AdBlogStoryActionCardProps {
  written_content_Id: number;
  type: TYPE_WRITTEN_CONTENT;
  manager_Id: number;
}

export default function Ad_Blog_Story_Card_Action({
  written_content_Id,
  type = TYPE_WRITTEN_CONTENT.ADS,
  manager_Id,
}: AdBlogStoryActionCardProps) {
  const [openedPopover, setOpenedPopover] = useState(false);

  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const router = useRouter();

  const ACTIONS: ActionItem[] = [
    {
      label: 'عرض',
      icon: Eye,
      action: () =>
        router.push(
          MANAGER_ROUTES_fUNC({
            manager_Id: manager_Id,
            written_content_Id: written_content_Id,
          }).AD_BLOG_STORY + `?written-tab=${type}`
        ),
    },
    {
      label: 'تعديل',
      icon: Edit,
      action: () =>
        router.push(
          MANAGER_ROUTES_fUNC({
            manager_Id: manager_Id,
            written_content_Id: written_content_Id,
          }).ADD_ADS_BLOGS_STORIES +
            `?action=${ACTION_ADD_EDIT_DISPLAY.EDIT}&id=${written_content_Id}&written-tab=${type}`
        ),
    },
    {
      label: 'حذف',
      icon: Trash,
      action: () => openDelete(),
    },
  ];

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
        '!rounded-none !text-dark',
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
            <EllipsisVertical size={16} className='mx-auto text-primary' />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown p={0} className='!bg-gray-200 !border-none'>
          <Stack justify='flex-start' gap={0}>
            {Dropdown_Items}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      <Delete_Ad_Article_Story_Modal
        id={written_content_Id}
        close={closeDelete}
        opened={openedDelete}
        type={type}
        manager_Id={manager_Id}
      />
    </>
  );
}
