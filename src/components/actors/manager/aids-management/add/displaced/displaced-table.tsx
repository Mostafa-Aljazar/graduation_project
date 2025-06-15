'use client';
import { useEffect, useState } from 'react';
import {
  Button,
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
import { getDisplaced } from '@/actions/actors/general/displaced/getDisplacedInfo';
import type { displacedResponse } from '@/@types/actors/general/displaceds/displacesResponse.type';

interface Filters {
  wife_status: string;
  family_number: number | undefined;
  ages: string[];
  chronic_disease: string;
  accommodation_type: string;
  case_type: string;
  delegate: string[] | number[];
}

interface DisplacedTableProps {
  localFilters: Filters;
  setDisplacedNum: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRows: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  selectedRows: (string | number)[];
}

export default function DisplacedTable({
  localFilters,
  setDisplacedNum,
  setSelectedRows,
  selectedRows,
}: DisplacedTableProps) {
  const [activePage, setActivePage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );
  const [search] = useQueryState('search', parseAsString.withDefault(''));
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const getSelectedCount = () => {
    return selectedRows.length;
  };

  const {
    data: displacedData,
    isLoading,
    error: queryError,
  } = useQuery<displacedResponse, Error>({
    queryKey: ['displaced', activePage, search, localFilters],
    queryFn: () =>
      getDisplaced({
        page: activePage,
        limit: 7,
        search,
        filters: localFilters,
      }),
    retry: 1,
  });

  useEffect(() => {
    setDisplacedNum(displacedData?.pagination.totalItems || 0);
  }, [displacedData, setDisplacedNum]);

  const {
    data: allDisplacedData,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<(number | string)[], Error>({
    queryKey: ['displaced_all', search, localFilters],
    queryFn: async () => {
      const totalPages = displacedData?.pagination.totalPages || 1;
      const allIds: (number | string)[] = [];

      for (let page = 1; page <= totalPages; page++) {
        const response = await getDisplaced({
          page,
          limit: 100,
          search,
          filters: localFilters,
        });
        const pageIds = response.displaceds.map((item) => item.id);
        allIds.push(...pageIds);
      }

      return allIds;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
  });

  useEffect(() => {
    if (allDisplacedData && selectAllAcrossPages) {
      setSelectedRows(allDisplacedData);
    }
  }, [allDisplacedData, selectAllAcrossPages, setSelectedRows]);

  const isRowSelected = (id: number | string) => {
    return selectedRows.includes(id);
  };

  const areAllPagesRowsSelected = () => {
    return (
      selectedRows.length ===
      (displacedData?.pagination.totalItems ?? allDisplacedData?.length ?? 0)
    );
  };

  const handleRowSelection = (id: number | string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev.filter((rowId) => rowId !== id), id]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    if (!displacedData?.displaceds) return;

    if (checked) {
      setSelectAllAcrossPages(true);
      setSelectedRows([...(allDisplacedData ?? [])]);
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
          onChange={(event) =>
            handleSelectAllAcrossAllPages(event.currentTarget.checked)
          }
          disabled={!displacedData?.displaceds?.length}
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
    </Table.Tr>
  );

  const rows = displacedData?.displaceds.map((element, index) => (
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
          onChange={(event) =>
            handleRowSelection(element.id, event.currentTarget.checked)
          }
        />
      </Table.Td>
      <Table.Td px={5} ta='center' w='fit-content'>
        {(activePage - 1) * (displacedData?.pagination.limit ?? 7) + index + 1}
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

  return (
    <>
      <Group
        flex={1}
        justify='space-between'
        align='center'
        wrap='nowrap'
        hidden={selectedRows.length === 0}
      >
        {(selectAllAcrossPages ||
          selectedRows.length === displacedData?.pagination.totalItems) && (
          <Text size='md' fw={500} style={{ whiteSpace: 'nowrap' }}>
            تم تحديد جميع العناصر عبر جميع الصفحات
            {isLoadingAll && ' (جاري تحميل البيانات...)'}
            {allQueryError && ` (خطأ: ${allQueryError.message})`}
          </Text>
        )}
        {selectedRows.length !== displacedData?.pagination.totalItems &&
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
        total={displacedData?.pagination.totalPages || 0}
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
