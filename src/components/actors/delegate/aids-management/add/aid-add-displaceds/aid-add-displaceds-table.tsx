'use client';

import {
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Stack,
  Table,
  Text,
} from '@mantine/core';

import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { DESTINATION_DISPLACED } from '@/content/actor/displaced/filter';
import { displacedFilterValues } from '@/validation/actor/general/displaced-filter-form';
import { DisplacedsResponse } from '@/@types/actors/general/displaceds/displacesResponse.type';
import { getDisplaceds } from '@/actions/actors/general/displaced/getDisplaceds';
import { getDisplacedsIDs } from '@/actions/actors/general/displaced/getDisplacedsIDs';
import { getDisplacedByIds } from '@/actions/actors/general/displaced/getDisplacedByIds';
import Displaced_Table_Actions from '@/components/actors/general/Displaced/displaced-table-actions';
import Receive_Aid from '@/components/actors/manager/aids-management/add/displaced/receive-aid/receive-aid';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { UserPen } from 'lucide-react';
import {
  addAidDisplaceds,
  addAidDisplacedsProps,
} from '@/actions/actors/general/aids-management/addAidDisplaceds';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { notifications } from '@mantine/notifications';

interface DisplacedsTableProps {
  setDisplacedNum: React.Dispatch<React.SetStateAction<number>>;
  localFilters: displacedFilterValues;
  aid_Data: Aid;
  actor_Id: number;
  role: Exclude<
    (typeof USER_TYPE)[UserType],
    | typeof USER_TYPE.DISPLACED
    | typeof USER_TYPE.SECURITY
    | typeof USER_TYPE.SECURITY_OFFICER
  >;
}

export default function Aid_Ad_Displaceds_Table({
  localFilters,
  setDisplacedNum,
  aid_Data,
  actor_Id,
  role,
}: DisplacedsTableProps) {
  const receivedDisplacedIDs =
    aid_Data.received_displaced.map((res) => res.displaced_id) || [];

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [query, setQuery] = useQueryStates(
    {
      displaced_page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(''),
    },
    { shallow: true }
  );

  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, displaced_page: page }));
  };

  const {
    data: displacedData,
    isLoading: isLoadingRegular,
    error: queryError,
  } = useQuery<DisplacedsResponse, Error>({
    queryKey: ['displaced', query, localFilters],
    queryFn: () =>
      getDisplaceds({
        page: query.displaced_page,
        limit: 7,
        search: query.search,
        filters: localFilters,
      }),
    retry: 1,
  });

  const {
    data: allDisplacedIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[], Error>({
    queryKey: ['displaced_all', query.search, localFilters],
    queryFn: async () => {
      const response = await getDisplacedsIDs({
        filters: localFilters,
      });
      return response.displacedsIDs;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
  });
  console.log('🚀 ~ allDisplacedIDs:', allDisplacedIDs);

  const DISPLACED_DATA = displacedData;

  const isLoading = isLoadingRegular;
  const error = queryError;

  useEffect(() => {
    if (setDisplacedNum) {
      setDisplacedNum(DISPLACED_DATA?.pagination?.totalItems || 0);
    }
  }, [DISPLACED_DATA, setDisplacedNum]);

  useEffect(() => {
    if (allDisplacedIDs && selectAllAcrossPages) {
      setSelectedRows(allDisplacedIDs);
    }
  }, [allDisplacedIDs, selectAllAcrossPages, setSelectedRows]);

  const isRowSelected = (id: number) => selectedRows?.includes(id) || false;

  const areAllPagesRowsSelected = () =>
    selectedRows?.length ===
    (DISPLACED_DATA?.pagination?.totalItems || allDisplacedIDs?.length || 0);

  const handleRowSelection = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev.filter((rowId) => rowId !== id), id]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    if (checked) {
      setSelectAllAcrossPages(true);
      setSelectedRows(allDisplacedIDs || []);
    } else {
      setSelectAllAcrossPages(false);
      setSelectedRows([]);
    }
  };

  const headers = (
    <Table.Tr>
      <Table.Th px={5} ta='center' w='fit-content'>
        <Checkbox
          aria-label='Select all rows across all pages'
          checked={areAllPagesRowsSelected()}
          onChange={(e) =>
            handleSelectAllAcrossAllPages(e.currentTarget.checked)
          }
          disabled={!DISPLACED_DATA?.displaceds?.length}
        />
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content'>
        الرقم
      </Table.Th>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        اسم النازح
      </Table.Th>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        رقم الهوية
      </Table.Th>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        رقم الخيمة
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content'>
        عدد الأفراد
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content'>
        رقم الجوال
      </Table.Th>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        اسم المندوب
      </Table.Th>
    </Table.Tr>
  );

  const rows = (DISPLACED_DATA?.displaceds || []).map((element, index) => (
    <Table.Tr
      key={element.id}
      bg={
        isRowSelected(element.id)
          ? 'var(--mantine-color-blue-light)'
          : undefined
      }
    >
      <Table.Td px={5} ta='center' w='fit-content'>
        <Checkbox
          aria-label='Select row'
          checked={isRowSelected(element.id)}
          onChange={(e) =>
            handleRowSelection(element.id, e.currentTarget.checked)
          }
        />
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {((query.displaced_page ??
          (DISPLACED_DATA?.pagination?.page as number)) -
          1) *
          (DISPLACED_DATA?.pagination?.limit || 7) +
          index +
          1}
      </Table.Td>
      <Table.Td
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        {element.name}
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {element.identity}
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {element.tent}
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {element.family_number}
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {element.mobile_number}
      </Table.Td>
      <Table.Td
        px={5}
        w='fit-content'
        ta='center'
        style={{ whiteSpace: 'nowrap' }}
      >
        {element.delegate.name}
      </Table.Td>
    </Table.Tr>
  ));

  const addAidDisplacedsMutation = useMutation<
    modalActionResponse,
    Error,
    addAidDisplacedsProps
  >({
    mutationFn: addAidDisplaceds,
    onSuccess: (data) => {
      if (Number(data.status) == 200) {
        notifications.show({
          title: data.message,
          message: `تم إضافة النازحين للمساعدة بنجاح`,
          color: 'grape',
          position: 'top-left',
          withBorder: true,
          loading: true,
        });
      } else {
        throw new Error(data.error || 'حدث خطأ أثناء إضافة النازحين للمساعدة');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || error?.message;
      // setError(errorMessage);
      notifications.show({
        title: 'خطأ',
        message: errorMessage,
        color: 'red',
        position: 'top-left',
        withBorder: true,
      });
    },
  });

  const handleOnClick = () => {
    // TODO: handel calculate displaceds Portions
    addAidDisplacedsMutation.mutate({
      aid_Id: aid_Data.id,
      actor_Id,
      role,
      displaceds_Ids: selectedRows,
    });
  };

  return (
    <Stack>
      <Group
        flex={1}
        justify='space-between'
        align='center'
        wrap='nowrap'
        hidden={!selectedRows?.length || false}
      >
        {selectedRows?.length === 0 ? (
          <Text size='md' fw={500} c='dimmed'>
            لم يتم تحديد أي عنصر
          </Text>
        ) : selectAllAcrossPages ||
          selectedRows?.length === DISPLACED_DATA?.pagination?.totalItems ? (
          <Text size='md' fw={500} style={{ whiteSpace: 'nowrap' }}>
            تم تحديد جميع العناصر عبر جميع الصفحات
            {isLoadingAll && ' (جاري تحميل البيانات...)'}
            {allQueryError && ` (خطأ: ${allQueryError.message})`}
          </Text>
        ) : (
          <Text size='md' fw={500}>
            تم تحديد {selectedRows.length} عنصر
          </Text>
        )}
      </Group>
      <Table.ScrollContainer
        minWidth='100%'
        w='100%'
        pos='relative'
        className={cn(isLoading && '!min-h-[300px]')}
      >
        <LoadingOverlay
          visible={isLoading || isLoadingAll}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 0.3 }}
        />
        {error && (
          <Text fw={500} size='sm' ta='center' c='red'>
            {error.message}
          </Text>
        )}
        {!isLoading &&
          (!DISPLACED_DATA?.displaceds ||
            DISPLACED_DATA.displaceds.length === 0) && (
            <Text fw={500} size='sm' ta='center' c='dimmed'>
              لا توجد بيانات للنازحين
            </Text>
          )}
        <Table
          horizontalSpacing='xs'
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>{headers}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Pagination
        value={query.displaced_page}
        onChange={handlePageChange}
        total={DISPLACED_DATA?.pagination?.totalPages || 0}
        pt={30}
        size='sm'
        mx='auto'
        radius='xl'
        withControls={false}
        classNames={{
          dots: '!rounded-full !text-gray-300 border-1',
          control: '!rounded-full',
        }}
      />
      <Button
        size='sm'
        fz={16}
        fw={500}
        c={'white'}
        mx={'auto'}
        mt={20}
        className='!bg-primary !shadow-lg !w-fit'
        onClick={handleOnClick}
        rightSection={<UserPen size={16} />}
        loading={addAidDisplacedsMutation.isPending}
      >
        إضافة
      </Button>
    </Stack>
  );
}
