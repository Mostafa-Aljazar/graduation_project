'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  ActionIcon,
  Center,
  Checkbox,
  Group,
  Loader,
  LoadingOverlay,
  Pagination,
  Stack,
  Table,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/utils/cn';
import { getDelegates } from '@/actions/actors/general/delegates/getDelegates';
import {
  Delegate,
  DelegatesResponse,
} from '@/@types/actors/general/delegates/delegatesResponse.type';
import { getDelegatesIds } from '@/actions/actors/general/delegates/getDelegatesIds';
import Delegates_Table_Actions from '../delegates-table-actions';
import { ListChecks, ListX, Users } from 'lucide-react';

export default function Delegates_Table() {
  const [query, setQuery] = useQueryStates(
    {
      delegate_page: parseAsInteger.withDefault(1),
    },
    { shallow: true }
  );

  const [selectedDelegateIds, setSelectedDelegateIds] = useState<number[]>([]);
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const currentPage = query.delegate_page || 1;
  const limit = 7;
  const offset = (currentPage - 1) * limit;

  const {
    data: delegatesData,
    isLoading: isLoadingRegular,
    error: queryError,
  } = useQuery<DelegatesResponse, Error>({
    queryKey: ['delegates', query],
    queryFn: () =>
      getDelegates({
        page: query.delegate_page,
        limit: limit,
      }),
    retry: 1,
  });

  const {
    data: allDelegatesIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[], Error>({
    queryKey: ['delegates_all'],
    queryFn: async () => {
      return (await getDelegatesIds()).delegates_Ids;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isLoadingAll || isLoadingRegular;
  const error = allQueryError || queryError;

  useEffect(() => {
    if (allDelegatesIDs && selectAllAcrossPages) {
      setSelectedDelegateIds(allDelegatesIDs);
    }
  }, [allDelegatesIDs, selectAllAcrossPages]);

  const isRowSelected = (id: number) => selectedDelegateIds.includes(id);

  const areAllPagesRowsSelected = () =>
    selectedDelegateIds.length === (delegatesData?.pagination?.total_items || 0);

  const handleRowSelection = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedDelegateIds((prev) => [...prev.filter((rowId) => rowId !== id), id]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedDelegateIds((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    if (checked) {
      setSelectAllAcrossPages(true);
      setSelectedDelegateIds(allDelegatesIDs || []);
    } else {
      setSelectAllAcrossPages(false);
      setSelectedDelegateIds([]);
    }
  };

  const columns = (
    <Table.Tr>
      <Table.Th px={5} ta='center' style={{ width: 40 }}>
        <ActionIcon
          variant='light'
          aria-label='Select all rows across all pages'
          disabled={!delegatesData?.delegates?.length}
          onClick={() => handleSelectAllAcrossAllPages(!areAllPagesRowsSelected())}
        >
          {areAllPagesRowsSelected() ? <ListX size={18} /> : <ListChecks size={18} />}
        </ActionIcon>
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content'>
        #
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' style={{ whiteSpace: 'nowrap' }}>
        اسم المندوب
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' style={{ whiteSpace: 'nowrap' }}>
        رقم الهوية
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' style={{ whiteSpace: 'nowrap' }}>
        عدد النازحين
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' style={{ whiteSpace: 'nowrap' }}>
        عدد العائلات
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' style={{ whiteSpace: 'nowrap' }}>
        عدد الخيام
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' style={{ whiteSpace: 'nowrap' }}>
        رقم الجوال
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' style={{ whiteSpace: 'nowrap' }}>
        الإجراءات
      </Table.Th>
    </Table.Tr>
  );

  const rows = useMemo(() => {
    return (delegatesData?.delegates || []).map((element, index) => (
      <Table.Tr
        key={element.id}
        bg={isRowSelected(element.id) ? 'var(--mantine-color-blue-light)' : undefined}
      >
        <Table.Td px={5} ta='center'>
          <Checkbox
            aria-label='Select row'
            checked={isRowSelected(element.id)}
            onChange={(e) => handleRowSelection(element.id, e.currentTarget.checked)}
          />
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {offset + index + 1}
        </Table.Td>
        <Table.Td px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
          {element.name}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.identity}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.displaced_number}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.family_number}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.tents_number}
        </Table.Td>
        <Table.Td px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
          {element.mobile_number}
        </Table.Td>

        <Table.Td px={5} ta='center'>
          <Delegates_Table_Actions delegate_Id={element.id} />
        </Table.Td>
      </Table.Tr>
    ));
  }, [delegatesData, selectedDelegateIds]);

  const noDelegates = (
    <Table.Tr>
      <Table.Td colSpan={9}>
        <Center w='100%' py={30}>
          <Stack align='center' gap={8}>
            <ThemeIcon variant='light' radius='xl' size={50} color='gray'>
              <Users size={25} />
            </ThemeIcon>
            <Text ta='center' c='dimmed' fw={500} size='md'>
              لا توجد بيانات للمناديب
            </Text>
          </Stack>
        </Center>
      </Table.Td>
    </Table.Tr>
  );

  return (
    <>
      <Group
        justify='space-between'
        align='center'
        wrap='nowrap'
        hidden={selectedDelegateIds.length === 0}
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
              تم تحديد {selectedDelegateIds.length} عنصر
            </Text>
          )}
        </Group>

        {selectedDelegateIds.length > 0 && (
          <Group justify='flex-end' flex={1}>
            <Delegates_Table_Actions delegate_Ids={selectedDelegateIds} />
          </Group>
        )}
        <Group justify='flex-end' flex={1}>
          <Delegates_Table_Actions delegate_Ids={selectedDelegateIds} />
        </Group>
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
          {error && (
            <Text fw={500} size='sm' ta='center' c='red'>
              {error.message}
            </Text>
          )}
        </>

        <Table horizontalSpacing='xs' striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>{columns}</Table.Thead>
          <Table.Tbody>{rows.length === 0 ? noDelegates : rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Pagination
        value={currentPage}
        onChange={(page) => setQuery((prev) => ({ ...prev, delegate_page: page }))}
        total={delegatesData?.pagination?.total_pages || 0}
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
