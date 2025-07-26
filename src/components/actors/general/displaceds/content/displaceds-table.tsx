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
import { useEffect, useMemo, useState } from 'react';
import { displacedsFilterValues } from '@/validation/actor/general/displaceds-filter-form';
import { DisplacedsResponse } from '@/@types/actors/general/displaceds/displacesResponse.type';
import { getDisplaceds } from '@/actions/actors/general/displaceds/getDisplaceds';
import { getDisplacedsIDs } from '@/actions/actors/general/displaceds/getDisplacedsIDs';
import Displaced_Table_Actions from '@/components/actors/general/displaceds/displaced-table-actions';
import { ListChecks, ListX, Users } from 'lucide-react';

interface DisplacedsTableProps {
  localFilters: displacedsFilterValues;
  setDisplacedNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function Displaceds_Table({
  localFilters,
  setDisplacedNum,
}: DisplacedsTableProps) {
  const [selectedDisplacedIds, setSelectedDisplacedIds] = useState<number[]>(
    []
  );
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const [query, setQuery] = useQueryStates(
    {
      displaced_page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(''),
    },
    { shallow: true }
  );

  const currentPage = query.displaced_page || 1;
  const limit = 7;
  const offset = (currentPage - 1) * limit;

  const {
    data: displacedData,
    isLoading: isLoadingRegular,
    error: queryError,
  } = useQuery<DisplacedsResponse, Error>({
    queryKey: ['displaceds', query, localFilters],
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
    data: allDisplacedIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[], Error>({
    queryKey: ['displaced_all', query.search, localFilters],
    queryFn: async () =>
      (await getDisplacedsIDs({ filters: localFilters })).displacedsIDs,
    enabled: selectAllAcrossPages,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isLoadingAll || isLoadingRegular;
  const error = allQueryError || queryError;

  useEffect(() => {
    setDisplacedNum(displacedData?.pagination?.totalItems || 0);
  }, [displacedData, setDisplacedNum]);

  useEffect(() => {
    if (allDisplacedIDs && selectAllAcrossPages) {
      setSelectedDisplacedIds(allDisplacedIDs);
    }
  }, [allDisplacedIDs, selectAllAcrossPages]);

  const isRowSelected = (id: number) => selectedDisplacedIds.includes(id);
  const areAllPagesRowsSelected = () =>
    selectedDisplacedIds.length ===
    (displacedData?.pagination?.totalItems || 0);

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

  const columns = (
    <Table.Tr>
      <Table.Th px={5} ta='center' style={{ width: 40 }}>
        <ActionIcon
          variant='light'
          aria-label='Select all rows across all pages'
          disabled={!displacedData?.displaceds?.length}
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
      <Table.Th px={5} ta='center'>
        الإجراءات
      </Table.Th>
    </Table.Tr>
  );

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
        <Table.Td px={5} ta='center'>
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
        <Table.Td px={5} ta='center'>
          <Displaced_Table_Actions displaced_Id={element.id} />
        </Table.Td>
      </Table.Tr>
    ));
  }, [displacedData, selectedDisplacedIds]);

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

  /*const rows = (DELEGATES_DATA?.delegates || []).map((element, index) => (
      <Table.Tr
        key={element.id}
        bg={
          isRowSelected(element.id) || areAllPagesRowsSelected()
            ? 'var(--mantine-color-blue-light)'
            : undefined
        }
      >
        <Table.Td
          px={5}
          ta='center'
          hidden={query.delegatesPortions === DELEGATE_PORTIONS.manual}
        >
          <Checkbox
            aria-label='Select row'
            checked={isRowSelected(element.id)}
            onChange={(event) => {
              inDelegates
                ? handleRowSelectionInDelegates(
                    element.id,
                    event.currentTarget.checked
                  )
                : handleRowSelectionInAids(
                    element.id,
                    event.currentTarget.checked
                  );
            }}
            disabled={inDisplayedAid}
          />
        </Table.Td>
        <Table.Td px={5} ta='center' w='fit-content'>
          {((query.delegate_page ??
            (DELEGATES_DATA?.pagination?.page as number)) -
            1) *
            (DELEGATES_DATA?.pagination?.limit ?? 7) +
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
        <Table.Td
          px={5}
          ta='center'
          w='fit-content'
          style={{ whiteSpace: 'nowrap' }}
        >
          {element.identity}
        </Table.Td>
        <Table.Td
          px={5}
          ta='center'
          w='fit-content'
          style={{ whiteSpace: 'nowrap' }}
        >
          {element.displaced_number}
        </Table.Td>
        <Table.Td
          px={5}
          ta='center'
          w='fit-content'
          style={{ whiteSpace: 'nowrap' }}
        >
          {element.family_number}
        </Table.Td>
        <Table.Td
          px={5}
          ta='center'
          w='fit-content'
          style={{ whiteSpace: 'nowrap' }}
        >
          {element.tents_number}
        </Table.Td>
        <Table.Td
          px={5}
          ta='center'
          w='fit-content'
          style={{ whiteSpace: 'nowrap' }}
        >
          {element.mobile_number}
        </Table.Td>
        <Table.Td
          px={5}
          ta='center'
          w='fit-content'
          style={{ whiteSpace: 'nowrap' }}
          hidden={!inDelegates}
        >
          <Delegates_Table_Actions delegate_Id={element.id} />
        </Table.Td>
        <Table.Td
          ta='center'
          px={5}
          className='!flex !justify-center'
          hidden={inDelegates}
        >
          <NumberInput
            w={100}
            placeholder='0'
            size='sm'
            min={0}
            max={maxPortionInputValue(element)}
            mx='auto'
            classNames={{
              input: 'placeholder:text-sm text-primary font-medium',
            }}
            className='!mx-auto'
            allowDecimal={false}
            value={portionInputValue(element)}
            disabled={disabledPortionInputValue(element)}
            onChange={(val) => handlePortionChange(element.id, Number(val))}
          />
        </Table.Td>
      </Table.Tr>
    )); */
  return (
    <>
      <Group
        justify='space-between'
        align='center'
        wrap='nowrap'
        hidden={selectedDisplacedIds.length === 0}
      >
        <Group flex={1}>
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

        <Group justify='flex-end' flex={1}>
          <Displaced_Table_Actions displaced_Ids={selectedDisplacedIds} />
        </Group>
      </Group>

      <ScrollArea>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          pos={'relative'}
        >
          <LoadingOverlay
            visible={isLoading}
            zIndex={49}
            overlayProps={{ radius: 'sm', blur: 0.3 }}
          />
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
        total={displacedData?.pagination?.totalPages || 0}
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
