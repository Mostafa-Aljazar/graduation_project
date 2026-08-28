'use client';
import {
  Aid,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import {
  Stack,
  Divider,
  LoadingOverlay,
  Group,
  Text,
  Button,
  ThemeIcon,
  Badge,
} from '@mantine/core';
import {
  DESTINATION_AID,
  DISTRIBUTION_MECHANISM,
  MANAGER_DESTINATION_AID,
} from '@/@types/actors/common-types/index.type';
import { Package, SquarePen } from 'lucide-react';
import Common_Aid_Form from '../common/aid-form/common-aid-form';
import Common_Aid_Delegates_List from '../common/delegates/common-aid-delegates-list';
import { useEffect, useState } from 'react';
import Common_Aid_Delivery_Displaceds from '@/components/actors/general/aids-management/aid/delivery-displaceds/common-aid-delivery-displaceds';
import { useRouter } from 'next/navigation';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';

function Aid_Header({
  is_completed = false,
  manager_Id,
  aid_Id,
}: {
  is_completed: boolean;
  manager_Id: number;
  aid_Id: number;
}) {
  const router = useRouter();

  return (
    <Group gap={10} justify='space-between' w='100%'>
      <Group align='center' gap={5}>
        <ThemeIcon size={25} radius='xl' color='white'>
          <Package size={18} className='text-primary' />
        </ThemeIcon>
        <Text fz={{ base: 16, md: 18 }} fw={600} className='!text-primary'>
          تفاصيل المساعدة :
        </Text>
        <Badge
          color={is_completed ? 'green' : 'yellow'}
          size='lg'
          variant='filled'
          className='w-fit'
        >
          الحالة : {is_completed ? 'مكتمل' : 'قيد التنفيذ'}
        </Badge>
      </Group>

      <Button
        size='xs'
        fz={14}
        fw={500}
        c='white'
        radius='md'
        className='!bg-primary'
        rightSection={<SquarePen size={14} />}
        onClick={() =>
          router.push(
            `${
              MANAGER_ROUTES_fUNC({ manager_Id: manager_Id, aid_Id: aid_Id }).ADD_AID
            }?aid_Id=${aid_Id}`
          )
        }
      >
        تعديل المساعدة
      </Button>
    </Group>
  );
}

interface ManagerAidContentProps {
  isLoading: boolean;
  aid_Data: Aid;
  manager_Id: number;
}

export default function Manager_Aid_Content({
  aid_Data,
  manager_Id,
  isLoading,
}: ManagerAidContentProps) {
  const [selectedDelegatesPortions, setSelectedDelegatesPortions] = useState<
    SelectedDelegatePortion[]
  >((aid_Data && aid_Data?.selected_delegates_portions) ?? []);

  useEffect(() => {
    if (aid_Data?.selected_delegates_portions) {
      setSelectedDelegatesPortions(aid_Data.selected_delegates_portions);
    }
  }, [aid_Data?.selected_delegates_portions]);

  return (
    <Stack pos={'relative'}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />

      <Aid_Header
        is_completed={aid_Data?.is_completed}
        manager_Id={manager_Id}
        aid_Id={aid_Data?.id}
      />
      {aid_Data && <Common_Aid_Form initialData={aid_Data} isDisabled={true} />}

      <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />

      {aid_Data && aid_Data?.distribution_mechanism == DISTRIBUTION_MECHANISM.DELEGATES_LISTS && (
        <Common_Aid_Delegates_List
          destination={DESTINATION_AID.DISPLAY_AIDS}
          selectedDelegatesPortions={selectedDelegatesPortions}
          setSelectedDelegatesPortions={setSelectedDelegatesPortions}
          aid_Id={aid_Data.id ?? -1}
          aid_Data={aid_Data}
        />
      )}

      <Divider h={1} bg='#DFDEDC' w='100%' flex={1} />

      {aid_Data && <Common_Aid_Delivery_Displaceds aid_Data={aid_Data} />}
    </Stack>
  );
}
