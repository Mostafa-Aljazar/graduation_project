'use client';
import { ActionIcon, Button, Popover, Stack, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { LANDING_ROUTES, MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { cn } from '@/utils/cn';
import Delete_Ad_Article_Story_Modal from './delete-ad-story-article-modal';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  id: string | number;
  destination?: 'BLOG' | 'SUCCESS_STORIES' | 'ADS';
};

export default function Action_Card({ id, destination = 'BLOG' }: Props) {
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const isInSuccessStories = destination === 'SUCCESS_STORIES';

  const ACTIONS = [
    {
      label: 'تعديل',
      icon: Edit,
      action: () => {
        // router.push(MANAGER_ROUTES_fUNC(1));//FIXME:
        window.location.href = `/edit/${id}`;
      },
    },
    {
      label: 'فتح',
      icon: Eye,
      action: () => {
        window.location.href = isInSuccessStories
          ? `${LANDING_ROUTES.SUCCESS_STORY}/${id}`
          : `${LANDING_ROUTES.BLOG}/${id}`;
      },
    },
    {
      label: 'حذف',
      icon: Trash2,
      action: () => {
        openModal();
      },
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
      fw={500}
      className={cn(
        ' !text-dark !rounded-md hover:!bg-second-light ',
        index + 1 !== ACTIONS.length && '!border-gray-100 !border-0 !border-b-1'
      )}
      onClick={() => {
        item.action();
        setOpened(false);
      }}
    >
      {item.label}
    </Button>
  ));

  return (
    <>
      <Popover
        width={130}
        opened={opened}
        onChange={setOpened}
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
            onClick={() => setOpened((o) => !o)}
          >
            <EllipsisVertical size={20} className='mx-auto text-primary' />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown p={0} className='!bg-gray-200 !border-nones'>
          <Stack justify='flex-start' gap={0}>
            {Dropdown_Items}
          </Stack>
        </Popover.Dropdown>
      </Popover>

      <Delete_Ad_Article_Story_Modal
        id={id}
        close={closeModal}
        opened={openedModal}
        destination={destination}
      />
    </>
  );
}
