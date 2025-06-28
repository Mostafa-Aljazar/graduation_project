'use client';

import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
} from '@mantine/core';

import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { useQuery } from '@tanstack/react-query';
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

interface DisplacedsTableProps {
  destination: DESTINATION_DISPLACED;
  localFilters: displacedFilterValues;
  setDisplacedNum: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  selectedRows: number[];
  receivedDisplaced?: { displaced_ID: number; receivedTime: Date }[];
  aid_id?: number;
}

export default function Displaceds_Table({
  destination,
  localFilters,
  setDisplacedNum,
  setSelectedRows,
  selectedRows,
  receivedDisplaced,
  aid_id,
}: DisplacedsTableProps) {
  // const isDisabled = false;

  const inDisplaced = destination == DESTINATION_DISPLACED.DISPLACEDS;
  const inDisplayedAid = destination == DESTINATION_DISPLACED.DISPLAY_AIDS;
  const inAddAid = destination == DESTINATION_DISPLACED.ADD_AIDS;
  const inEditAid = destination == DESTINATION_DISPLACED.EDIT_AIDS;

  const receivedDisplacedIDs =
    ((inDisplayedAid || inEditAid) &&
      receivedDisplaced?.map((res) => res.displaced_ID)) ||
    [];

  console.log('🚀 ~ receivedDisplacedIDs:', receivedDisplacedIDs);
  console.log('🚀 ~ selectedRows:', selectedRows);

  const [query, setQuery] = useQueryStates(
    {
      displaced_page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(''),
      action: parseAsStringEnum<ACTION_ADD_EDIT_DISPLAY>(
        Object.values(ACTION_ADD_EDIT_DISPLAY)
      ).withDefault(ACTION_ADD_EDIT_DISPLAY.ADD),
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

  console.log('🚀 ~ displacedData:', displacedData);

  const {
    data: selectedDisplacedData,
    isLoading: isLoadingSelected,
    error: selectedQueryError,
  } = useQuery<DisplacedsResponse, Error>({
    queryKey: ['displaced_selected', selectedRows, query.displaced_page],
    queryFn: () =>
      getDisplacedByIds({
        ids: selectedRows || [],
        page: query.displaced_page,
        limit: 7,
        //TODO: add filter also
      }),
    // enabled: inDisplayedAid || inEditAid || !!selectedRows?.length,
    enabled: inDisplayedAid,
    retry: 1,
  });

  console.log('🚀 ~ selectedDisplacedData:', selectedDisplacedData);

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

  const DISPLACED_DATA =
    destination == DESTINATION_DISPLACED.DISPLAY_AIDS
      ? selectedDisplacedData
      : destination == DESTINATION_DISPLACED.EDIT_AIDS
      ? displacedData
      : displacedData;

  // const data = isDisabled ? selectedDisplacedData : displacedData;
  const isLoading = isLoadingSelected || isLoadingRegular;
  const error = selectedQueryError || queryError;

  useEffect(() => {
    setDisplacedNum(DISPLACED_DATA?.pagination?.totalItems || 0);
  }, [DISPLACED_DATA, setDisplacedNum]);

  useEffect(() => {
    // if (allDisplacedIDs && selectAllAcrossPages && setSelectedRows) {
    if (allDisplacedIDs && selectAllAcrossPages) {
      setSelectedRows(allDisplacedIDs);
    }
  }, [allDisplacedIDs, selectAllAcrossPages, setSelectedRows]);

  const isRowSelected = (id: number) => selectedRows?.includes(id) || false;

  const areAllPagesRowsSelected = () =>
    selectedRows?.length ===
    (DISPLACED_DATA?.pagination?.totalItems || allDisplacedIDs?.length || 0);

  const handleRowSelection = (id: number, checked: boolean) => {
    if (!setSelectedRows) return;
    if (checked) {
      setSelectedRows((prev) => [...prev.filter((rowId) => rowId !== id), id]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    // if (!DISPLACED_DATA?.displaceds || !setSelectedRows) return;
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
      {!inDisplayedAid && (
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
      )}
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
      {(inDisplayedAid || inEditAid) && (
        <Table.Th
          px={5}
          ta='center'
          w='fit-content'
          style={{ whiteSpace: 'nowrap' }}
        >
          حالة التسليم
        </Table.Th>
      )}
      {inDisplaced && (
        <Table.Th px={5} ta='center' w='fit-content'>
          الإجراءات
        </Table.Th>
      )}
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
      <Table.Td px={5} ta='center' w='fit-content' hidden={inDisplayedAid}>
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
      {(inDisplayedAid || inEditAid) && selectedRows?.includes(element.id) && (
        <Table.Td px={5} ta='center' w='fit-content'>
          {receivedDisplacedIDs?.includes(element.id) ? (
            'تم'
          ) : (
            <Receive_Aid
              displaced_Id={element.id as number}
              aid_id={aid_id as number}
              disabled={inEditAid}
            />
          )}
        </Table.Td>
      )}
      {inDisplaced && (
        <Table.Td ta='center' px={5} w='fit-content'>
          <Displaced_Table_Actions displaced_ID={element.id} />
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <>
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
        {inDisplaced && (
          <Displaced_Table_Actions
            disabled={selectedRows?.length === 0 || isLoadingAll}
            displaced_IDs={selectedRows}
          />
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
    </>
  );
}
