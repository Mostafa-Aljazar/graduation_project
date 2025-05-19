'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
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
import Table_Actions from './Table_Actions';
import Selected_Displaced_Operation from './Selected_Delegate_Operation';
import { getDelegates } from '@/actions/actors/general/delegates/getDelegatesInfo';
import { delegatesResponse } from '@/@types/actors/general/delegates/delegatesResponse.type';
import { getDisplaced } from '@/actions/actors/general/displaced/getDisplacedInfo';
import Selected_Delegates_Operation from './Selected_Delegate_Operation';

type Props = {
  localFilters: {
    displaceds_number: number[];
    tents_number: number[];
  };
  setDelegatesNum: React.Dispatch<React.SetStateAction<number>>;
};

export default function Delegates_Table({
  localFilters,
  setDelegatesNum,
}: Props) {
  const [activePage, setActivePage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );
  const [search] = useQueryState('search', parseAsString.withDefault(''));

  // Track specifically selected rows (when not in selectAll mode)
  const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);

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
    data: Delegates_Data,
    isLoading,
    error: queryError,
  } = useQuery<delegatesResponse, Error>({
    queryKey: ['delegates', activePage, search, localFilters],
    queryFn: () =>
      getDelegates({
        page: activePage,
        limit: 7,
        search,
        filters: localFilters,
      }),
    retry: 1,
  });

  // Set Delegates Number to send to another component
  useEffect(() => {
    setDelegatesNum(Delegates_Data?.pagination.totalItems || 0);
  }, [Delegates_Data, setDelegatesNum]);

  // Fetch all Delegates IDs when selectAllAcrossPages is true
  const {
    data: all_Delegates_Data,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<(number | string)[], Error>({
    queryKey: ['delegates_all', search, localFilters],
    queryFn: async () => {
      const totalPages = Delegates_Data?.pagination.totalPages || 1;
      const allIds: (number | string)[] = [];

      for (let page = 1; page <= totalPages; page++) {
        const response = await getDelegates({
          page,
          limit: 100, // Adjust limit based on API constraints
          search,
          filters: localFilters,
        });
        const pageIds = response.delegates.map((item) => item.id);
        allIds.push(...pageIds);
      }

      return allIds;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
  });

  //DONE:   Set all Displaced in SelectedRows
  useEffect(() => {
    if (all_Delegates_Data && selectAllAcrossPages) {
      setSelectedRows(all_Delegates_Data);
    }
  }, [all_Delegates_Data, selectAllAcrossPages]);

  //DONE: Check if a specific row is selected
  const isRowSelected = (id: number | string) => {
    return selectedRows.includes(id);
  };

  //DONE: Handle if All  Pages Rows Selected
  const areAllPagesRowsSelected = () => {
    return (
      selectedRows.length ==
      ((Delegates_Data?.pagination.totalItems as number) ||
        (all_Delegates_Data?.length as number))
    );
  };

  // Handle individual row selection
  const handleRowSelection = (id: number | string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev.filter((rowId) => rowId !== id), id]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  //DONE: Handle "select all" checkbox in table header
  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    if (!Delegates_Data?.delegates) return;

    if (checked) {
      // Select all rows across all pages
      setSelectAllAcrossPages(true);
      setSelectedRows([...(all_Delegates_Data ?? [])]);
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
          disabled={!Delegates_Data?.delegates?.length}
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
        اسم المندوب
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
        عدد النازحين
      </Table.Th>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        عدد العائلات
      </Table.Th>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        عدد الخيام
      </Table.Th>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
      >
        رقم الجوال
      </Table.Th>

      <Table.Th px={5} ta='center' w='fit-content'>
        الإجراءات
      </Table.Th>
    </Table.Tr>
  );

  const rows = Delegates_Data?.delegates.map((element, index) => (
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
        {(activePage - 1) * Delegates_Data.pagination.limit + index + 1}
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
        {element.displaced_number}
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {element.family_number}
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {element.tents_number}
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {element.mobile_number}
      </Table.Td>

      <Table.Td ta='center' px={5} w='fit-content'>
        <Table_Actions delegate_Id={element.id} />
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
          selectedRows.length == Delegates_Data?.pagination.totalItems) && (
          <Text size='md' fw={500} style={{ whiteSpace: 'nowrap' }}>
            تم تحديد جميع العناصر عبر جميع الصفحات
            {isLoadingAll && ' (جاري تحميل البيانات...)'}
            {allQueryError && ` (خطأ: ${allQueryError.message})`}
          </Text>
        )}
        {selectedRows.length !== Delegates_Data?.pagination.totalItems &&
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

        <Selected_Delegates_Operation
          disabled={getSelectedCount() === 0 || isLoadingAll}
          delegate_Ids={selectedRows}
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
        total={Delegates_Data?.pagination.totalPages || 0}
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
