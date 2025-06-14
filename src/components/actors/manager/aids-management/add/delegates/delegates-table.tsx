'use client';
import { useEffect, useState } from 'react';
import {
  Checkbox,
  Group,
  LoadingOverlay,
  NumberInput,
  Pagination,
  Table,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/utils/cn';
import type { delegatesResponse } from '@/@types/actors/general/delegates/delegatesResponse.type';
import { getDelegates } from '@/actions/actors/general/delegates/getDelegatesInfo';
import {
  DELEGATE_PORTIONS,
  QUANTITY_AVAILABILITY,
} from '@/content/actor/manager/aids-management';

interface Filters {
  displaceds_number: number[];
  tents_number: number[];
}

interface DelegatesTableProps {
  localFilters: Filters;
  setDelegatesNum: React.Dispatch<React.SetStateAction<number>>;
  setSelectedDelegatesPortions: React.Dispatch<
    React.SetStateAction<{ delegate_id: string | number; portion: number }[]>
  >;
  selectedDelegatesPortions: {
    delegate_id: string | number;
    portion: number;
  }[];
}

export default function Delegates_Table({
  localFilters,
  setDelegatesNum,
  setSelectedDelegatesPortions,
  selectedDelegatesPortions,
}: DelegatesTableProps) {
  // console.log('🚀 ~ selectedDelegatesPortions:', selectedDelegatesPortions);

  const [query, setQuery] = useQueryStates({
    delegatesPortions: parseAsStringEnum<DELEGATE_PORTIONS>(
      Object.values(DELEGATE_PORTIONS)
    ).withDefault(DELEGATE_PORTIONS.equal),

    quantityAvailability: parseAsStringEnum<QUANTITY_AVAILABILITY>(
      Object.values(QUANTITY_AVAILABILITY)
    ).withDefault(QUANTITY_AVAILABILITY.limited),

    existingQuantity: parseAsInteger.withDefault(0),

    delegateSinglePortion: parseAsInteger.withDefault(0),

    page: parseAsInteger.withDefault(1),

    search: parseAsString.withDefault(''),
  });

  const { page: activePage, search } = query;

  const [remainingQuantity, setRemainingQuantity] = useState(
    query.existingQuantity
  );
  console.log('🚀 ~ remainingQuantity:', remainingQuantity);

  // console.log('🚀 ~ existingQuantity:', query.existingQuantity);

  // useEffect(() => {
  //   // Reset portions when delegatesPortions or quantityAvailability changes
  //   setSelectedDelegatesPortions((prev) =>
  //     prev.map((d) => ({
  //       ...d,
  //       portion:
  //         query.delegatesPortions === DELEGATE_PORTIONS.equal
  //           ? query.delegateSinglePortion
  //           : 0,
  //     }))
  //   );

  //   const totalPortion = selectedDelegatesPortions.reduce(
  //     (sum, d) => sum + d.portion,
  //     0
  //   );
  //   // Restore previous total portion to remainingQuantity and existingQuantity
  //   setRemainingQuantity(query.existingQuantity - totalPortion);
  //   // if (query.quantityAvailability === QUANTITY_AVAILABILITY.limited) {
  //   //   setQuery((prev) => ({
  //   //     ...prev,
  //   //     existingQuantity: prev.existingQuantity + totalPortion,
  //   //   }));
  //   // }
  // }, [
  //   query.delegatesPortions,
  //   query.quantityAvailability,
  //   query.delegateSinglePortion,
  // ]);

  // console.log('🚀 ~ query:', query);

  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  // Get based on page
  const {
    data: delegatesData,
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

  // DONE:
  useEffect(() => {
    if (delegatesData) {
      setDelegatesNum(delegatesData.pagination.totalItems);
    }
  }, [delegatesData]);

  // Get all Data
  const {
    data: allDelegatesData,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<(number | string)[], Error>({
    queryKey: ['delegates_all', search, localFilters],
    queryFn: async () => {
      const totalPages = delegatesData?.pagination.totalPages || 1;
      const allIds: (number | string)[] = [];

      for (let page = 1; page <= totalPages; page++) {
        const response = await getDelegates({
          page,
          limit: 100,
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

  // useEffect(() => {
  //   if (allDelegatesData && selectAllAcrossPages) {
  //     const portion =
  //       query.delegatesPortions === DELEGATE_PORTIONS.equal
  //         ? query.delegateSinglePortion
  //         : 0;
  //     if (
  //       query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
  //       portion * allDelegatesData.length > remainingQuantity
  //     ) {
  //       notifications.show({
  //         title: 'خطأ',
  //         message: 'لا يمكن تحديد جميع المناديب، الكمية المتبقية غير كافية',
  //         color: 'red',
  //         position: 'top-left',
  //       });
  //       setSelectAllAcrossPages(false);
  //       return;
  //     }
  //     const newSelectedPortions = allDelegatesData.map((id) => ({
  //       delegate_id: id,
  //       portion,
  //     }));
  //     setSelectedDelegatesPortions(newSelectedPortions);
  //     if (
  //       query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
  //       portion > 0
  //     ) {
  //       setRemainingQuantity(
  //         (prev) => prev - portion * allDelegatesData.length
  //       );
  //     }
  //   }
  // }, [
  //   allDelegatesData,
  //   selectAllAcrossPages,
  //   query,
  //   setSelectedDelegatesPortions,
  //   remainingQuantity,
  // ]);

  console.log('🚀 ~ selectedDelegatesPortions:', selectedDelegatesPortions);

  // DONE:
  const isRowSelected = (id: number | string) =>
    selectedDelegatesPortions.some((row) => row.delegate_id === id);

  // DONE:
  const handleRowSelection = (id: number | string, checked: boolean) => {
    if (checked) {
      const portion = query.delegateSinglePortion || 0;
      if (
        query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
        portion > remainingQuantity
      ) {
        notifications.show({
          title: 'خطأ',
          message: 'الكمية المتبقية غير كافية لتحديد هذا المندوب',
          color: 'red',
          position: 'top-left',
        });
        return;
      }

      // // GOOD:
      // setSelectedDelegatesPortions((prev) => [
      //   ...prev,
      //   { delegate_id: id, portion },
      // ]);

      setSelectedDelegatesPortions((prev) => {
        if (!prev.some((d) => d.delegate_id === id)) {
          return [...prev, { delegate_id: id, portion }];
        }
        return prev;
      });

      if (
        query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
        portion > 0
      ) {
        setRemainingQuantity((prev) => prev - portion);
      }

      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      const removed = selectedDelegatesPortions.find(
        (d) => d.delegate_id === id
      );

      setSelectedDelegatesPortions((prev) =>
        prev.filter((d) => d.delegate_id !== id)
      );
      if (
        removed &&
        query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
        removed.portion > 0
      ) {
        setRemainingQuantity((prev) => prev + removed.portion);
      }
      setSelectAllAcrossPages(false);
    }
  };

  // DONE:
  const areAllPagesRowsSelected = () =>
    selectedDelegatesPortions.length ===
    (delegatesData?.pagination.totalItems ?? allDelegatesData?.length ?? 0);

  // DONE:
  const handleSelectAllAcrossAllPages = (selectAll: boolean) => {
    // Actually NO delegates
    if (!delegatesData?.delegates) return;

    // return to default vales
    setSelectedDelegatesPortions([]);
    setRemainingQuantity(query.existingQuantity);

    if (selectAll) {
      const portion =
        query.delegatesPortions === DELEGATE_PORTIONS.equal
          ? query.delegateSinglePortion
          : 0;

      if (
        query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
        portion * (delegatesData.pagination.totalItems || 0) >
          query.existingQuantity
      ) {
        notifications.show({
          title: 'خطأ',
          message: 'لا يمكن تحديد جميع المناديب، الكمية المتبقية غير كافية',
          color: 'red',
          position: 'top-left',
        });

        setSelectAllAcrossPages(false);
        setSelectedDelegatesPortions([]);
        setRemainingQuantity(query.existingQuantity);

        return;
      } else {
        setSelectAllAcrossPages(true);

        const newSelectedPortions = (allDelegatesData ?? []).map((id) => ({
          delegate_id: id,
          portion,
        }));

        setSelectedDelegatesPortions(newSelectedPortions);

        if (
          query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
          portion > 0
        ) {
          setRemainingQuantity(
            query.existingQuantity - portion * (allDelegatesData?.length || 0) // or allDelegatesData?.length
          );
        }
      }
    } else {
      // setSelectAllAcrossPages(false);
      setSelectedDelegatesPortions([]);
      setRemainingQuantity(query.existingQuantity);
    }
  };

  // const handlePortionChange = (
  //   delegateId: string | number,
  //   val: number | string
  // ) => {
  //   if (query.delegatesPortions !== DELEGATE_PORTIONS.manual) return;
  //   if (typeof val !== 'number' || val < 0) return;
  //   console.log('🚀 ~ val:', val);

  //   const currentPortion =
  //     selectedDelegatesPortions.find((d) => d.delegate_id === delegateId)
  //       ?.portion || 0;

  //   // console.log('🚀 ~ currentPortion:', currentPortion);

  //   if (
  //     query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
  //     val > remainingQuantity
  //   ) {
  //     notifications.show({
  //       title: 'خطأ',
  //       message: 'الكمية المتبقية غير كافية لتخصيص هذه الحصة',
  //       color: 'red',
  //       position: 'top-left',
  //     });
  //     setSelectedDelegatesPortions((prev) =>
  //       prev.filter((d) => d.delegate_id !== delegateId)
  //     );

  //     const valuesRemain = selectedDelegatesPortions.reduce(
  //       (sum, currentValue) => sum + currentValue.portion,
  //       0
  //     );

  //     setRemainingQuantity(valuesRemain);
  //     return;
  //   }

  //   const diff = val - currentPortion;

  //   setSelectedDelegatesPortions((prev) => {
  //     const exists = prev.find((d) => d.delegate_id === delegateId);
  //     if (exists) {
  //       return prev.map((d) =>
  //         d.delegate_id === delegateId ? { ...d, portion: val } : d
  //       );
  //     } else {
  //       return [...prev, { delegate_id: delegateId, portion: val }];
  //     }
  //   });

  //   if (val > 0 && !isRowSelected(delegateId)) {
  //     setSelectedDelegatesPortions((prev) => {
  //       if (!prev.some((d) => d.delegate_id === delegateId)) {
  //         return [...prev, { delegate_id: delegateId, portion: val }];
  //       }
  //       return prev;
  //     });
  //   }

  //   if (query.quantityAvailability === QUANTITY_AVAILABILITY.limited) {
  //     setRemainingQuantity((prev) => prev - diff);
  //     // setQuery((prev) => ({
  //     //   ...prev,
  //     //   existingQuantity: prev.existingQuantity - diff,
  //     // }));
  //   }
  // };

  // FIXME:

  // DONE:
  const handlePortionChange = (
    delegateId: string | number,
    val: number | string
  ) => {
    if (query.delegatesPortions !== DELEGATE_PORTIONS.manual) return;

    const currentPortion =
      selectedDelegatesPortions.find((d) => d.delegate_id === delegateId)
        ?.portion ?? 0;

    if (typeof val !== 'number' || val <= 0) {
      setRemainingQuantity((prev) => prev + currentPortion);
      setSelectedDelegatesPortions((prev) =>
        prev.filter((d) => d.delegate_id !== delegateId)
      );
      return;
    }

    if (
      typeof val !== 'number' ||
      val <= 0 ||
      (query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
        val > remainingQuantity + currentPortion)
    ) {
      notifications.show({
        title: 'خطأ',
        message: 'الكمية المتبقية غير كافية لتخصيص هذه الحصة',
        color: 'red',
        position: 'top-left',
      });
      setRemainingQuantity((prev) => prev + currentPortion);
      // setRemainingQuantity((prev) => prev);
      setSelectedDelegatesPortions((prev) =>
        prev.filter((d) => d.delegate_id !== delegateId)
      );

      return;
    }

    const diff = val - currentPortion;

    setSelectedDelegatesPortions((prev) => {
      const exists = prev.find((d) => d.delegate_id === delegateId);
      if (exists) {
        return prev.map((d) =>
          d.delegate_id === delegateId ? { ...d, portion: val } : d
        );
      } else {
        return [...prev, { delegate_id: delegateId, portion: val }];
      }
    });

    if (val > 0 && !isRowSelected(delegateId)) {
      setSelectedDelegatesPortions((prev) => {
        if (!prev.some((d) => d.delegate_id === delegateId)) {
          return [...prev, { delegate_id: delegateId, portion: val }];
        }
        return prev;
      });
    }

    if (query.quantityAvailability === QUANTITY_AVAILABILITY.limited) {
      setRemainingQuantity((prev) => prev - diff);
    }
  };

  const headers = (
    <Table.Tr>
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        hidden={query.delegatesPortions === DELEGATE_PORTIONS.manual}
      >
        <Checkbox
          aria-label='Select all rows across all pages'
          value={1}
          checked={areAllPagesRowsSelected()}
          onChange={(event) => {
            const selectAll = event.currentTarget.checked;
            handleSelectAllAcrossAllPages(selectAll);
          }}
          disabled={!delegatesData?.delegates?.length}
        />
      </Table.Th>
      <Table.Th px={5} ta='center'>
        الرقم
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
        عدد العائلات
      </Table.Th>
      <Table.Th px={5} ta='center'>
        عدد الخيام
      </Table.Th>
      <Table.Th px={5} ta='center'>
        رقم الجوال
      </Table.Th>
      <Table.Th px={5} ta='center'>
        عدد الأسماء
      </Table.Th>
    </Table.Tr>
  );

  const rows = delegatesData?.delegates.map((element, index) => (
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
            console.log('🚀 ~ event:', event.currentTarget.checked);

            handleRowSelection(element.id, event.currentTarget.checked);
          }}
        />
      </Table.Td>
      <Table.Td px={5} ta='center'>
        {(activePage - 1) * (delegatesData?.pagination.limit ?? 7) + index + 1}
      </Table.Td>
      <Table.Td px={5} ta='center'>
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
      <Table.Td px={5} ta='center'>
        {element.mobile_number}
      </Table.Td>
      <Table.Td ta='center' px={5} className='!flex !justify-center'>
        <NumberInput
          w={100}
          placeholder='0'
          size='sm'
          min={0}
          max={
            query.delegatesPortions === DELEGATE_PORTIONS.manual
              ? remainingQuantity +
                (selectedDelegatesPortions.find(
                  (d) => d.delegate_id === element.id
                )?.portion || 0)
              : undefined
          }
          mx='auto'
          classNames={{
            input: 'placeholder:text-sm text-primary font-medium',
          }}
          className='!mx-auto'
          allowDecimal={false}
          value={
            query.delegatesPortions === DELEGATE_PORTIONS.equal
              ? query.delegateSinglePortion
              : selectedDelegatesPortions.find(
                  (d) => d.delegate_id === element.id
                )?.portion ?? 0
          }
          disabled={
            query.delegatesPortions === DELEGATE_PORTIONS.equal ||
            (remainingQuantity == 0 &&
              !selectedDelegatesPortions.some(
                (item) => item.delegate_id == element.id
              ))
          }
          onChange={(val) => handlePortionChange(element.id, val)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Text>remaining: {remainingQuantity}</Text>
      <Group
        flex={1}
        justify='space-between'
        align='center'
        wrap='nowrap'
        hidden={selectedDelegatesPortions.length === 0}
      >
        {(selectAllAcrossPages ||
          selectedDelegatesPortions.length ===
            delegatesData?.pagination.totalItems) && (
          <Text size='md' fw={500} style={{ whiteSpace: 'nowrap' }}>
            تم تحديد جميع العناصر عبر جميع الصفحات
            {isLoadingAll && ' (جاري تحميل البيانات...)'}
            {allQueryError && ` (خطأ: ${allQueryError.message})`}
          </Text>
        )}
        {selectedDelegatesPortions.length !==
          delegatesData?.pagination.totalItems &&
          selectedDelegatesPortions.length > 0 && (
            <Text size='md' fw={500}>
              تم تحديد {selectedDelegatesPortions.length} عنصر
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
        total={delegatesData?.pagination.totalPages || 0}
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
