'use client';
import {
  Complaint,
  ManagerComplaint,
} from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import {
  replyManagerComplaint,
  replyManagerComplaintProps,
} from '@/actions/actors/manager/complaints/replyManagerComplaint';
import { cn } from '@/utils/cn';
import { Button, Group, Modal, Stack, Text, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

interface DisplacedComplaintModalProps {
  complaint: Complaint;
  opened: boolean;
  close: () => void;
}
export default function Displaced_Complaint_Modal({
  complaint,
  opened,
  close,
}: DisplacedComplaintModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => close()}
      title={
        <Text fz={18} fw={600} ta={'center'} className='!text-primary'>
          {complaint.title}
        </Text>
      }
      classNames={{
        title: '!w-full',
      }}
      centered
    >
      <Stack gap={10}>
        <Group gap={10} justify='left'>
          <Text fz={14} className='!text-primary'>
            {complaint.time}
          </Text>
          <Text fz={14} className='!text-primary'>
            {complaint.date}
          </Text>
        </Group>

        <Group flex={1} gap={5}>
          <Text fz={18} fw={600} className='!text-primary'>
            {complaint.receiver.role === 'DELEGATE'
              ? 'المندوب : '
              : complaint.receiver.role === 'SECURITY' ||
                complaint.receiver.role === 'SECURITY_OFFICER'
              ? 'الامن : '
              : 'المدير : '}
          </Text>
          <Text fz={16} fw={500} className='!text-dark'>
            {complaint.receiver.name}
          </Text>
        </Group>

        <Group flex={1} gap={5} align='start'>
          <Text fz={16} fw={600} className='!text-primary'>
            الموضوع :
          </Text>
          <Text flex={1} fz={16} fw={500} className='!text-dark'>
            {complaint.body}
          </Text>
        </Group>
      </Stack>
    </Modal>
  );
}
