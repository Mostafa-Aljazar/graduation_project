'use client';

import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
  ScrollArea,
  Loader,
  ActionIcon,
  Center,
  Stack,
  ThemeIcon,
} from '@mantine/core';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { displacedsFilterValues } from '@/validation/actor/general/displaceds-filter-form';
import { DisplacedsResponse } from '@/@types/actors/general/displaceds/displacesResponse.type';
import { getDisplaceds } from '@/actions/actors/general/displaceds/getDisplaceds';
import Displaced_Table_Actions from '@/components/actors/general/displaceds/displaced-table-actions';
import { ListChecks, ListX, Users } from 'lucide-react';
import { ReceivedDisplaceds } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getDisplacedByIds } from '@/actions/actors/general/displaceds/getDisplacedByIds';
import Receive_Aid from '../receive-aid/receive-aid';
import { DESTINATION_AID } from '@/@types/actors/common-types/index.type';
import { getDisplacedsIds } from '@/actions/actors/general/displaceds/getDisplacedsIds';

interface AidDisplacedsTableProps {
  localFilters: displacedsFilterValues;
  setDisplacedNum: React.Dispatch<React.SetStateAction<number>>;
  aid_Id?: number;
  destination: DESTINATION_AID;
  setSelectedDisplacedIds: Dispatch<SetStateAction<number[]>>;
  selectedDisplacedIds: number[];
  receivedDisplaceds: ReceivedDisplaceds[];
  setReceivedDisplaceds: Dispatch<SetStateAction<ReceivedDisplaceds[]>>;
}

export default function Aid_Displaceds_Table({
  localFilters,
  setDisplacedNum,
  destination,
  setSelectedDisplacedIds,
  selectedDisplacedIds,
  setReceivedDisplaceds,
  receivedDisplaceds,
  aid_Id,
}: AidDisplacedsTableProps) {
  console.log('🚀 ~ receivedDisplaceds:', receivedDisplaceds);
  console.log('🚀 ~ selectedDisplacedIds:', selectedDisplacedIds);
  console.log('🚀 ~ destination:', destination);

  const receivedDisplacedIds =
    receivedDisplaceds?.map((res) => res.displaced_Id) || [];

  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const [query, setQuery] = useQueryStates(
    {
      displaced_page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(''),
    },
    { shallow: true }
  );

  const currentPage = query.displaced_page || 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const {
    data: addDisplacedData,
    isLoading: isLoadingRegular,
    error: queryError,
  } = useQuery<DisplacedsResponse, Error>({
    queryKey: ['add_displaceds', query, localFilters],
    queryFn: () =>
      getDisplaceds({
        page: currentPage,
        limit,
        search: query.search,
        filters: localFilters,
      }),
    retry: 1,
  });

  const {
    data: specificDisplacedDataById,
    isLoading: isLoadingDisplacedIds,
    error: queryErrorDisplacedIds,
  } = useQuery<DisplacedsResponse, Error>({
    queryKey: ['displaceds_by_Ids', query, localFilters],
    queryFn: () =>
      getDisplacedByIds({
        Ids: selectedDisplacedIds,
        page: currentPage,
        limit,
      }),
    retry: 1,
  });

  const {
    data: allDisplacedIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[], Error>({
    queryKey: ['displaceds_all', query.search, localFilters],
    queryFn: async () =>
      (await getDisplacedsIds({ filters: localFilters })).displaceds_Ids,
    enabled: selectAllAcrossPages,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const displacedData =
    destination == DESTINATION_AID.ADD_AIDS ||
    destination == DESTINATION_AID.EDIT_AIDS
      ? addDisplacedData
      : specificDisplacedDataById;
  console.log('🚀 ~ displacedData:', displacedData?.displaceds);

  const isLoading = isLoadingAll || isLoadingRegular || isLoadingDisplacedIds;
  const error = allQueryError || queryError || queryErrorDisplacedIds;

  useEffect(() => {
    if (displacedData) {
      setDisplacedNum(displacedData?.pagination?.total_items);
    }
  }, [displacedData, destination, setDisplacedNum]);

  // FIXME: get all in all scenarios
  useEffect(() => {
    if (
      destination !== DESTINATION_AID.DISPLAY_AIDS &&
      allDisplacedIDs &&
      selectAllAcrossPages
    ) {
      setSelectedDisplacedIds(allDisplacedIDs);
    }
  }, [allDisplacedIDs, selectAllAcrossPages]);

  const isRowSelected = (id: number) => selectedDisplacedIds.includes(id);

  // FIXME: in add, edit, display aid
  const areAllPagesRowsSelected = () =>
    selectedDisplacedIds.length ===
    (addDisplacedData?.pagination?.total_items || 0);

  const handleRowSelection = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedDisplacedIds((prev) => [
        ...prev.filter((rowId) => rowId !== id),
        id,
      ]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedDisplacedIds((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    if (checked) {
      setSelectAllAcrossPages(true);
      setSelectedDisplacedIds(allDisplacedIDs || []);
    } else {
      setSelectAllAcrossPages(false);
      setSelectedDisplacedIds([]);
    }
  };

  const isRowReceived = (id: number) =>
    receivedDisplacedIds?.includes(id) || false;

  // const columns = (
  const columns = useMemo(() => {
    return (
      <Table.Tr>
        <Table.Th
          px={5}
          ta='center'
          style={{ width: 40 }}
          hidden={destination == DESTINATION_AID.DISPLAY_AIDS}
        >
          <ActionIcon
            variant='light'
            aria-label='Select all rows across all pages'
            // disabled={!addDisplacedData?.displaceds?.length}
            onClick={() =>
              handleSelectAllAcrossAllPages(!areAllPagesRowsSelected())
            }
          >
            {areAllPagesRowsSelected() ? (
              <ListX size={18} />
            ) : (
              <ListChecks size={18} />
            )}
          </ActionIcon>
        </Table.Th>
        <Table.Th px={5} ta='center'>
          الرقم
        </Table.Th>
        <Table.Th px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
          اسم النازح
        </Table.Th>
        <Table.Th px={5} ta='right'>
          رقم الهوية
        </Table.Th>
        <Table.Th px={5} ta='center'>
          رقم الخيمة
        </Table.Th>
        <Table.Th px={5} ta='center'>
          عدد الأفراد
        </Table.Th>
        <Table.Th px={5} ta='center'>
          رقم الجوال
        </Table.Th>
        <Table.Th px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
          اسم المندوب
        </Table.Th>
        <Table.Th
          px={5}
          ta='center'
          hidden={destination !== DESTINATION_AID.DISPLAY_AIDS}
        >
          حالة التسليم
        </Table.Th>
      </Table.Tr>
    );
  }, [destination]);

  const rows = useMemo(() => {
    return (displacedData?.displaceds || []).map((element, index) => (
      <Table.Tr
        key={element.id}
        bg={
          isRowSelected(element.id)
            ? 'var(--mantine-color-blue-light)'
            : undefined
        }
      >
        <Table.Td
          px={5}
          ta='center'
          hidden={destination == DESTINATION_AID.DISPLAY_AIDS}
        >
          <Checkbox
            aria-label='Select row'
            checked={isRowSelected(element.id)}
            onChange={(e) =>
              handleRowSelection(element.id, e.currentTarget.checked)
            }
          />
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {offset + index + 1}
        </Table.Td>
        <Table.Td px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
          {element.name}
        </Table.Td>
        <Table.Td px={5} ta='right'>
          {element.identity}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.tent}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.family_number}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.mobile_number}
        </Table.Td>
        <Table.Td px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
          {element.delegate.name}
        </Table.Td>
        <Table.Td
          px={5}
          ta='center'
          w='fit-content'
          hidden={destination !== DESTINATION_AID.DISPLAY_AIDS}
        >
          {isRowReceived(element.id) ? (
            'تم'
          ) : (
            <Receive_Aid
              displaced_Id={element.id as number}
              aid_Id={aid_Id as number}
            />
          )}
        </Table.Td>
      </Table.Tr>
    ));
  }, [displacedData, selectedDisplacedIds, destination]);

  const noDisplaceds = (
    <Table.Tr>
      <Table.Td colSpan={9}>
        <Center w='100%' py={30}>
          <Stack align='center' gap={8}>
            <ThemeIcon variant='light' radius='xl' size={50} color='gray'>
              <Users size={25} />
            </ThemeIcon>
            <Text ta='center' c='dimmed' fw={500} size='md'>
              لا توجد بيانات للنازحين
            </Text>
          </Stack>
        </Center>
      </Table.Td>
    </Table.Tr>
  );

  return (
    <>
      <Group
        flex={1}
        wrap='nowrap'
        hidden={
          destination == DESTINATION_AID.DISPLAY_AIDS ||
          selectedDisplacedIds.length === 0
        }
      >
        {selectAllAcrossPages ? (
          <Text size='md' fw={500} style={{ whiteSpace: 'nowrap' }}>
            تم تحديد جميع العناصر عبر جميع الصفحات
            {isLoadingAll && <Loader size='xs' ml={5} />}
            {allQueryError && ` (خطأ: ${allQueryError.message})`}
          </Text>
        ) : (
          <Text size='md' fw={500}>
            تم تحديد {selectedDisplacedIds.length} عنصر
          </Text>
        )}
      </Group>

      <ScrollArea pos={'relative'}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={49}
          overlayProps={{ radius: 'sm', blur: 0.3 }}
        />
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead
            style={{
              position: 'sticky',
              top: 0,
              background: 'white',
              zIndex: 1,
            }}
          >
            {columns}
          </Table.Thead>
          <Table.Tbody>{rows.length === 0 ? noDisplaceds : rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <Pagination
        value={currentPage}
        onChange={(page) =>
          setQuery((prev) => ({ ...prev, displaced_page: page }))
        }
        total={displacedData?.pagination?.total_pages || 0}
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
    </>
  );
}
