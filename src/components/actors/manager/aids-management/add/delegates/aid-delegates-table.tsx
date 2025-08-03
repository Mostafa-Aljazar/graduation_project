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
  NumberInput,
  Box,
} from '@mantine/core';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ListChecks, ListX, Users } from 'lucide-react';
import { notifications } from '@mantine/notifications';

import {
  Aid,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import {
  DELEGATE_PORTIONS,
  DESTINATION_AID,
  DISTRIBUTION_MECHANISM,
  QUANTITY_AVAILABILITY,
} from '@/@types/actors/common-types/index.type';
import { getDelegates } from '@/actions/actors/general/delegates/getDelegates';
import { getDelegatesByIds } from '@/actions/actors/general/delegates/getDelegatesByIds';
import { getDelegatesIds } from '@/actions/actors/general/delegates/getDelegatesIds';
import {
  Delegate,
  DelegatesResponse,
} from '@/@types/actors/general/delegates/delegatesResponse.type';

interface AidDelegatesTableProps {
  destination: DESTINATION_AID;
  selectedDelegatesPortions: SelectedDelegatePortion[];
  setSelectedDelegatesPortions: React.Dispatch<
    React.SetStateAction<SelectedDelegatePortion[]>
  >;
  aid_data?: Aid;
  aid_Id?: number;
}

export default function Aid_Delegates_Table({
  destination,
  selectedDelegatesPortions,
  setSelectedDelegatesPortions,
  aid_data,
}: AidDelegatesTableProps) {
  console.log(
    '🚀 ~ Aid_Delegates_Table ~ selectedDelegatesPortions:',
    selectedDelegatesPortions
  );
  /** ==============================
   *  URL State
   *  ============================== */
  const [query, setQuery] = useQueryStates(
    {
      existingQuantity: parseAsInteger.withDefault(
        aid_data?.existing_quantity || 0
      ),
      quantityAvailability: parseAsStringEnum<QUANTITY_AVAILABILITY>(
        Object.values(QUANTITY_AVAILABILITY)
      ).withDefault(
        aid_data?.quantity_availability || QUANTITY_AVAILABILITY.LIMITED
      ),
      distributionMechanism: parseAsStringEnum<DISTRIBUTION_MECHANISM>(
        Object.values(DISTRIBUTION_MECHANISM)
      ).withDefault(
        aid_data?.distribution_mechanism ||
          DISTRIBUTION_MECHANISM.DELEGATES_LISTS
      ),
      delegatesPortions: parseAsStringEnum<DELEGATE_PORTIONS>(
        Object.values(DELEGATE_PORTIONS)
      ).withDefault(
        aid_data?.distribution_mechanism ===
          DISTRIBUTION_MECHANISM.DELEGATES_LISTS
          ? aid_data?.delegates_portions
          : DELEGATE_PORTIONS.EQUAL
      ),
      delegateSinglePortion: parseAsInteger.withDefault(
        aid_data?.distribution_mechanism ===
          DISTRIBUTION_MECHANISM.DELEGATES_LISTS
          ? (aid_data?.delegate_single_portion as number)
          : 0
      ),
      delegate_page: parseAsInteger.withDefault(1),
    },
    { shallow: true }
  );

  /** ==============================
   *  Sync portions on mode change
   *  ============================== */
  useEffect(() => {
    if (query.delegatesPortions === DELEGATE_PORTIONS.MANUAL) {
      setSelectedDelegatesPortions((prev) =>
        prev.map((item) => ({
          delegate_Id: item.delegate_Id,
          portion: item.portion || 0,
        }))
      );
    } else if (query.delegatesPortions === DELEGATE_PORTIONS.EQUAL) {
      setSelectedDelegatesPortions((prev) =>
        prev.map((item) => ({
          delegate_Id: item.delegate_Id,
          portion: query.delegateSinglePortion,
        }))
      );
    }
  }, [
    query.delegatesPortions,
    query.delegateSinglePortion,
    setSelectedDelegatesPortions,
  ]);

  /** ==============================
   *  Local State
   *  ============================== */
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const currentPage = query.delegate_page || 1;
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  /** ==============================
   *  Queries
   *  ============================== */
  const {
    data: addDelegatesData,
    isLoading: isLoadingRegular,
    error: queryError,
  } = useQuery<DelegatesResponse>({
    queryKey: ['add_delegates', query, destination],
    queryFn: () => getDelegates({ page: currentPage, limit }),
    retry: 1,
  });

  const selectedDelegatesIds = useMemo(
    () => selectedDelegatesPortions.map((res) => res.delegate_Id),
    [selectedDelegatesPortions]
  );

  const {
    data: specificDelegatesDataById,
    isLoading: isLoadingDelegatesIds,
    error: queryErrorDelegatesIds,
  } = useQuery<DelegatesResponse>({
    queryKey: ['delegates_by_Ids', query, destination],
    queryFn: () =>
      getDelegatesByIds({
        Ids: selectedDelegatesIds,
        page: currentPage,
        limit,
      }),
    retry: 1,
    enabled: destination !== DESTINATION_AID.ADD_AIDS,
  });

  const {
    data: allDelegatesIds,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[]>({
    queryKey: ['delegates_all', query, destination],
    queryFn: async () => (await getDelegatesIds()).delegates_Ids,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  /** ==============================
   *  Derived Data
   *  ============================== */
  const delegatesData =
    destination === DESTINATION_AID.ADD_AIDS ||
    destination === DESTINATION_AID.EDIT_AIDS
      ? addDelegatesData
      : specificDelegatesDataById;

  const isLoading = isLoadingAll || isLoadingRegular || isLoadingDelegatesIds;
  const error = allQueryError || queryError || queryErrorDelegatesIds;

  const totalSelectedPortion = useMemo(
    () => selectedDelegatesPortions.reduce((sum, cur) => sum + cur.portion, 0),
    [selectedDelegatesPortions]
  );

  const remainQ = query.existingQuantity - totalSelectedPortion;

  /** ==============================
   *  Helpers
   *  ============================== */
  const selectedDelegatesSet = useMemo(
    () => new Set(selectedDelegatesIds),
    [selectedDelegatesIds]
  );

  const isRowSelected = useCallback(
    (id: number) => selectedDelegatesSet.has(id),
    [selectedDelegatesSet]
  );

  const handleRowSelection = useCallback(
    (id: number, checked: boolean) => {
      setSelectedDelegatesPortions((prev) => {
        if (checked) {
          if (query.delegateSinglePortion <= remainQ) {
            return [
              ...prev.filter((row) => row.delegate_Id !== id),
              { delegate_Id: id, portion: query.delegateSinglePortion },
            ];
          }
          notifications.show({
            title: 'خطأ',
            message: 'الكمية المتبقية اقل من حصة المندوب',
            color: 'red',
            position: 'top-left',
            withBorder: true,
          });
          return prev;
        } else {
          return prev.filter((d) => d.delegate_Id !== id);
        }
      });
      setSelectAllAcrossPages(false);
    },
    [remainQ, query.delegateSinglePortion, setSelectedDelegatesPortions]
  );

  /** ==============================
   *  Select All Logic
   *  ============================== */
  const areAllRowsSelected = useCallback(
    () =>
      selectedDelegatesIds.length ===
      (addDelegatesData?.pagination?.total_items || 0),
    [selectedDelegatesIds, addDelegatesData]
  );

  const handleSelectAllAcrossAllPages = useCallback(
    (checked: boolean) => {
      // if (!allDelegatesIds) return;
      setSelectAllAcrossPages(true);

      if (checked) {
        const totalRequired =
          (allDelegatesIds?.length as number) * query.delegateSinglePortion;
        console.log(
          '🚀 ~ query.delegateSinglePortion:',
          query.delegateSinglePortion
        );
        console.log('🚀 ~ allDelegatesIds:', allDelegatesIds);
        console.log('🚀 ~ totalRequired:', totalRequired);

        if (totalRequired <= remainQ) {
          const portions = (allDelegatesIds || []).map((d) => ({
            delegate_Id: d,
            portion: query.delegateSinglePortion,
          }));

          setSelectedDelegatesPortions(portions);
          setSelectAllAcrossPages(true);
        } else {
          notifications.show({
            title: 'خطأ',
            message: 'الكمية المتبقية اقل من حصص المناديب',
            color: 'red',
            position: 'top-left',
            withBorder: true,
          });
          setSelectAllAcrossPages(false);
          setSelectedDelegatesPortions([]);
        }
      } else {
        setSelectAllAcrossPages(false);
        setSelectedDelegatesPortions([]);
      }
    },
    [
      allDelegatesIds,
      remainQ,
      query.delegateSinglePortion,
      selectAllAcrossPages,
    ]
  );

  const handlePortionChange = useCallback(
    (delegateId: number, value: number) => {
      setSelectedDelegatesPortions((prev) => {
        if (value === 0) {
          return prev.filter((item) => item.delegate_Id !== delegateId);
        }

        const currentPortion =
          prev.find((item) => item.delegate_Id === delegateId)?.portion || 0;
        const totalWithoutThis = totalSelectedPortion - currentPortion;
        const newTotal = totalWithoutThis + value;

        if (newTotal > query.existingQuantity) {
          notifications.show({
            title: 'خطأ',
            message: 'القيمة المدخلة تتجاوز الكمية المتبقية',
            color: 'red',
            position: 'top-left',
            withBorder: true,
          });
          return prev.filter((item) => item.delegate_Id !== delegateId);
        }

        if (prev.some((item) => item.delegate_Id === delegateId)) {
          return prev.map((item) =>
            item.delegate_Id === delegateId ? { ...item, portion: value } : item
          );
        }

        return [...prev, { delegate_Id: delegateId, portion: value }];
      });
    },
    [query.existingQuantity, totalSelectedPortion, setSelectedDelegatesPortions]
  );

  /** ==============================
   *  Table Header (Memoized)
   *  ============================== */
  const columns = useMemo(
    () => (
      <Table.Tr>
        <Table.Th
          px={5}
          ta='center'
          style={{ width: 40 }}
          hidden={
            (destination === DESTINATION_AID.DISPLAY_AIDS &&
              aid_data?.distribution_mechanism ===
                DISTRIBUTION_MECHANISM.DELEGATES_LISTS &&
              aid_data?.delegates_portions === DELEGATE_PORTIONS.MANUAL) ||
            (destination !== DESTINATION_AID.DISPLAY_AIDS &&
              query.delegatesPortions === DELEGATE_PORTIONS.MANUAL)
          }
        >
          <ActionIcon
            variant='light'
            aria-label='Select all'
            onClick={() => handleSelectAllAcrossAllPages(!areAllRowsSelected())}
          >
            {areAllRowsSelected() ? (
              <ListX size={18} />
            ) : (
              <ListChecks size={18} />
            )}
          </ActionIcon>
        </Table.Th>
        <Table.Th px={5} ta='center'>
          #
        </Table.Th>
        <Table.Th px={5} ta='center'>
          اسم المندوب
        </Table.Th>
        <Table.Th px={5} ta='center'>
          رقم الهوية
        </Table.Th>
        <Table.Th px={5} ta='center'>
          عدد النازحين
        </Table.Th>
        <Table.Th px={5} ta='center'>
          عدد الأُسر
        </Table.Th>
        <Table.Th px={5} ta='center'>
          رقم الجوال
        </Table.Th>
        <Table.Th px={5} ta='center'>
          عدد الخيام
        </Table.Th>
        <Table.Th px={5} ta='center'>
          حصص المناديب
        </Table.Th>
      </Table.Tr>
    ),
    [
      destination,
      query.delegatesPortions,
      selectAllAcrossPages,
      selectedDelegatesPortions,
    ]
  );

  /** ==============================
   *  Table Row Component
   *  ============================== */
  const TableRow = React.memo(
    ({ delegate, index }: { delegate: Delegate; index: number }) => {
      const selected = isRowSelected(delegate.id);

      return (
        <Table.Tr
          key={delegate.id}
          bg={selected ? 'var(--mantine-color-blue-light)' : undefined}
        >
          <Table.Td
            px={5}
            ta='center'
            hidden={query.delegatesPortions === DELEGATE_PORTIONS.MANUAL}
          >
            <Checkbox
              checked={selected}
              onChange={(e) =>
                handleRowSelection(delegate.id, e.currentTarget.checked)
              }
            />
          </Table.Td>
          <Table.Td px={5} ta='center'>
            {offset + index + 1}
          </Table.Td>
          <Table.Td px={5} ta='center'>
            {delegate.name}
          </Table.Td>
          <Table.Td px={5} ta='center'>
            {delegate.identity}
          </Table.Td>
          <Table.Td px={5} ta='center'>
            {delegate.displaced_number}
          </Table.Td>
          <Table.Td px={5} ta='center'>
            {delegate.family_number}
          </Table.Td>
          <Table.Td px={5} ta='center'>
            {delegate.mobile_number}
          </Table.Td>
          <Table.Td px={5} ta='center'>
            {delegate.tents_number}
          </Table.Td>
          <Table.Th px={5} ta='center'>
            <NumberInput
              placeholder='ادخل الحصة...'
              size='sm'
              w='100%'
              classNames={{
                input:
                  'disabled:!cursor-text !bg-white placeholder:!text-sm !text-primary !font-normal',
              }}
              value={
                query.delegatesPortions === DELEGATE_PORTIONS.EQUAL
                  ? query.delegateSinglePortion
                  : selectedDelegatesPortions.find(
                      (p) => p.delegate_Id === delegate.id
                    )?.portion || ''
              }
              allowDecimal={false}
              disabled={query.delegatesPortions === DELEGATE_PORTIONS.EQUAL}
              onChange={(val) =>
                handlePortionChange(delegate.id, Number(val) || 0)
              }
              min={0}
              max={query.existingQuantity}
            />
          </Table.Th>
        </Table.Tr>
      );
    }
  );

  TableRow.displayName = 'TableRow';

  /** ==============================
   *  Rows (Memoized)
   *  ============================== */
  const rows = useMemo(
    () =>
      (delegatesData?.delegates || []).map((delegate, index) => (
        <TableRow key={delegate.id} delegate={delegate} index={index} />
      )),
    [
      delegatesData,
      offset,
      isRowSelected,
      handleRowSelection,
      handlePortionChange,
    ]
  );

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

  /** ==============================
   *  Render
   *  ============================== */
  return (
    <>
      <Box mb={12}>
        <Text>الحسابات:</Text>
        <Text>الكمية المتاحة: {query.quantityAvailability}</Text>
        <Text>الكمية الموجودة: {query.existingQuantity}</Text>
        <Text>حصص المناديب: {query.delegatesPortions}</Text>
        <Text>حصة المندوب الواحد: {query.delegateSinglePortion}</Text>
        <Text>المتبقي: {remainQ}</Text>
      </Box>

      <Group
        flex={1}
        wrap='nowrap'
        hidden={
          selectedDelegatesIds.length === 0 ||
          query.delegatesPortions === DELEGATE_PORTIONS.MANUAL
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
            تم تحديد {selectedDelegatesIds.length} عنصر
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
          <Table.Tbody>{rows.length === 0 ? noDelegates : rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <Pagination
        value={currentPage}
        onChange={(page) =>
          setQuery((prev) => ({ ...prev, delegate_page: page }))
        }
        total={addDelegatesData?.pagination?.total_pages || 0}
        pt={30}
        size='sm'
        mx='auto'
        radius='xl'
        withControls={false}
      />
    </>
  );
}
