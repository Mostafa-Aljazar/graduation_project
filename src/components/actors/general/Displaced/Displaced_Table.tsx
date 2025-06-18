'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
} from '@mantine/core';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/utils/cn';
import { displacedFilterValues } from '@/validation/actor/general/displaced-filter-form';
import { DisplacedsResponse } from '@/@types/actors/general/displaceds/displacesResponse.type';
import { getDisplaceds } from '@/actions/actors/general/displaced/getDisplaceds';
import { getDisplacedsIDs } from '@/actions/actors/general/displaced/getDisplacedsIDs';
import Displaced_Table_Actions from './Displaced_Table_Actions';

interface DisplacedTableProps {
  localFilters: displacedFilterValues;
  setDisplacedNum: Dispatch<SetStateAction<number>>;
}

export default function Displaced_Table({
  localFilters,
  setDisplacedNum,
}: DisplacedTableProps) {
  const [activePage, setActivePage] = useQueryState(
    'displacedPage',
    parseAsInteger.withDefault(1)
  );
  const [search] = useQueryState('search', parseAsString.withDefault(''));

  // Track specifically selected rows (when not in selectAll mode)
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Track if "select all across pages" is active
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  //   Handel Change Page
  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  // Get the count of selected items across all pages
  const getSelectedCount = () => {
    return selectedRows.length;
  };

  // Fetch displaced data for the current page
  const {
    data: Displaced_Data,
    isLoading,
    error: queryError,
  } = useQuery<DisplacedsResponse, Error>({
    queryKey: ['displaced', activePage, search, localFilters],
    queryFn: () =>
      getDisplaceds({
        page: activePage,
        limit: 7,
        search,
        filters: localFilters,
      }),
    retry: 1,
  });

  // Set Displaced Number to send to another component
  useEffect(() => {
    setDisplacedNum(Displaced_Data?.pagination.totalItems || 0);
  }, [Displaced_Data, setDisplacedNum]);

  // Fetch all displaced IDs when selectAllAcrossPages is true
  const {
    data: DisplacedsIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[], Error>({
    queryKey: ['DisplacedsIDs', search, localFilters],
    queryFn: async () => {
      const response = await getDisplacedsIDs({
        search,
        filters: localFilters,
      });
      return response.displacedsIDs;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
  });

  // Set all Displaced in SelectedRows
  useEffect(() => {
    if (DisplacedsIDs && selectAllAcrossPages) {
      setSelectedRows(DisplacedsIDs);
    }
  }, [DisplacedsIDs, selectAllAcrossPages]);

  // Check if a specific row is selected
  const isRowSelected = (id: number) => {
    return selectedRows.includes(id);
  };

  // Handle if All  Pages Rows Selected
  const areAllPagesRowsSelected = () => {
    return (
      selectedRows.length ==
      (Displaced_Data?.pagination.totalItems || DisplacedsIDs?.length)
    );
  };

  // Handle individual row selection
  const handleRowSelection = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev.filter((rowId) => rowId !== id), id]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  // Handle "select all" checkbox in table header
  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    if (!Displaced_Data?.displaceds) return;

    if (checked) {
      // Select all rows across all pages
      setSelectAllAcrossPages(true);
      setSelectedRows(DisplacedsIDs || []);
    } else {
      // Deselect all rows
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
          onChange={(event) =>
            handleSelectAllAcrossAllPages(event.currentTarget.checked)
          }
          disabled={!Displaced_Data?.displaceds?.length}
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
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
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
      <Table.Th px={5} ta='center' w='fit-content'>
        الإجراءات
      </Table.Th>
    </Table.Tr>
  );

  const rows = Displaced_Data?.displaceds.map((element, index) => (
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
          onChange={(event) => {
            handleRowSelection(element.id, event.currentTarget.checked);
          }}
        />
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {(activePage - 1) * Displaced_Data.pagination.limit + index + 1}
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
      <Table.Td ta='center' px={5} w='fit-content'>
        <Displaced_Table_Actions displaced_ID={element.id} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group
        flex={1}
        justify='space-between'
        align='center'
        wrap='nowrap'
        hidden={selectedRows.length == 0}
      >
        {(selectAllAcrossPages ||
          selectedRows.length == Displaced_Data?.pagination.totalItems) && (
          <Text size='md' fw={500} style={{ whiteSpace: 'nowrap' }}>
            تم تحديد جميع العناصر عبر جميع الصفحات
            {isLoadingAll && ' (جاري تحميل البيانات...)'}
            {allQueryError && ` (خطأ: ${allQueryError.message})`}
          </Text>
        )}
        {selectedRows.length !== Displaced_Data?.pagination.totalItems &&
          selectedRows.length > 0 && (
            <Text size='md' fw={500}>
              تم تحديد {selectedRows.length} عنصر
            </Text>
          )}
        {selectedRows.length === 0 && (
          <Text size='md' fw={500} c='dimmed'>
            لم يتم تحديد أي عنصر
          </Text>
        )}

        <Displaced_Table_Actions
          disabled={getSelectedCount() === 0 || isLoadingAll}
          displaced_IDs={selectedRows}
        />
      </Group>
      <Table.ScrollContainer
        minWidth='100%'
        w='100%'
        pos='relative'
        className={cn(isLoading && '!min-h-[300px]')}
      >
        <>
          <LoadingOverlay
            visible={isLoading || isLoadingAll}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 0.3 }}
          />
          {queryError && (
            <Text fw={500} size='sm' ta='center' c='red'>
              {queryError.message}
            </Text>
          )}
        </>
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
        value={activePage}
        onChange={handlePageChange}
        total={Displaced_Data?.pagination.totalPages || 0}
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
