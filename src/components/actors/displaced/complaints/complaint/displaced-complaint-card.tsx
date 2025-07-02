'use client';
import { Box, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { cn } from '@/utils/cn';
import {
  Complaint,
  ManagerComplaint,
} from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import Image from 'next/image';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { DELEGATE, MAN } from '@/assets/actor';
import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import {
  changeStatusManagerComplaint,
  changeStatusManagerComplaintProps,
} from '@/actions/actors/manager/complaints/changeStatusManagerComplaint';
import Delete_Displaced_Complaint from './displaced-delete-complaint';
import Displaced_Complaint_Modal from './displaced-complaint-modal';

interface DisplacedComplaintCardProps {
  complaint: Complaint;
  displaced_ID: number;
}
export default function Displaced_Complaint_Card({
  complaint,
  displaced_ID,
}: DisplacedComplaintCardProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClick = (e: React.MouseEvent) => {
    //hint: TO PREVENT OPEN delete MODAL
    const path = e.nativeEvent.composedPath() as HTMLElement[];
    const clickedOnDelete = path.some((el) => {
      const attr = (el as HTMLElement)?.getAttribute?.('data-click');
      const classes = (el as HTMLElement)?.classList?.toString() || '';
      return attr === 'delete' || classes.includes('delete');
    });

    if (!clickedOnDelete) {
      open();
    }
  };

  return (
    <>
      <Card
        key={complaint.id}
        p='xs'
        radius='md'
        className={cn(
          '!border-1 !border-gray-200 cursor-pointer',
          complaint.status === COMPLAINTS_STATUS.READ
            ? '!bg-second-light'
            : '!bg-red-200'
        )}
        onClick={handleClick}
      >
        <Group>
          <Box
            className='bg-primary !border-1 !border-gray-300 !rounded-full !overflow-hidden'
            w={60}
            h={60}
          >
            <Image
              src={complaint.receiver.role === 'DELEGATE' ? DELEGATE : MAN}
              //   src={complaint.receiver.image ?? DELEGATE}//FIXME:
              alt='Profile'
              width={60}
              height={60}
              className='!object-cover'
            />
          </Box>

          <Stack flex={1} gap={0}>
            <Flex
              gap={10}
              direction='row'
              justify={{ base: 'right', md: 'left' }}
            >
              <Text fz='xs' c='dimmed'>
                {complaint.time}
              </Text>
              <Text fz='xs' c='dimmed'>
                {complaint.date}
              </Text>
            </Flex>
            <Text fz='md' fw={600} className='!text-primary'>
              {complaint.receiver.role === 'DELEGATE'
                ? 'المندوب : '
                : complaint.receiver.role === 'SECURITY' ||
                  complaint.receiver.role === 'SECURITY_OFFICER'
                ? 'الامن : '
                : 'المدير : '}
              {complaint.receiver.name}
            </Text>

            <Text fz='md' fw={600} className='!text-dark'>
              العنوان: {complaint.title}
            </Text>
          </Stack>

          <Delete_Displaced_Complaint
            complaint_ID={complaint.id}
            displaced_ID={displaced_ID}
          />
        </Group>
      </Card>
      <Displaced_Complaint_Modal
        complaint={complaint}
        opened={opened}
        close={close}
      />
    </>
  );
}
