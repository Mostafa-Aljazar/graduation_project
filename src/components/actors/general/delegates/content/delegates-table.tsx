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
import { getDelegates } from '@/actions/actors/general/delegates/getDelegates';
import {
  DELEGATE_PORTIONS,
  DISTRIBUTION_MECHANISM,
  QUANTITY_AVAILABILITY,
} from '@/content/actor/manager/aids-management';
import { delegatesFilterValues } from '@/validation/actor/general/delegates-filter-form';
import { DESTINATION_DELEGATES } from '@/content/actor/delegate/filter';
import { ACTION_ADD_EDIT } from '@/constants';
import {
  Delegate,
  DelegatesResponse,
} from '@/@types/actors/general/delegates/delegatesResponse.type';
import { getDelegatesIDs } from '@/actions/actors/general/delegates/getDelegatesIDs';
import Delegates_Table_Actions from '../Delegates_Table_Actions';
import {
  Aid,
  SelectedDelegatePortion,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getDelegatesByIds } from '@/actions/actors/general/delegates/getDelegatesByIds';

interface DelegatesTableProps {
  destination: DESTINATION_DELEGATES;
  localFilters: delegatesFilterValues;
  setDelegatesNum: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  selectedRows?: number[];

  setSelectedDelegatesPortions?: React.Dispatch<
    React.SetStateAction<SelectedDelegatePortion[]>
  >;
  selectedDelegatesPortions?: SelectedDelegatePortion[];

  aid_data?: Aid;
}

export default function Delegates_Table({
  destination,
  localFilters,
  setDelegatesNum,

  selectedRows,
  setSelectedRows,

  aid_data,
  selectedDelegatesPortions,
  setSelectedDelegatesPortions,
}: DelegatesTableProps) {
  const inDelegates = destination == DESTINATION_DELEGATES.DELEGATES;
  const inDisplayedAid = destination == DESTINATION_DELEGATES.DISPLAY_AIDS;
  const inAddAid = destination == DESTINATION_DELEGATES.ADD_AIDS;
  const inEditAid = destination == DESTINATION_DELEGATES.EDIT_AIDS;

  const [query, setQuery] = useQueryStates({
    delegatesPortions: parseAsStringEnum<DELEGATE_PORTIONS>(
      Object.values(DELEGATE_PORTIONS)
    ).withDefault(aid_data?.delegatesPortions ?? DELEGATE_PORTIONS.equal),

    quantityAvailability: parseAsStringEnum<QUANTITY_AVAILABILITY>(
      Object.values(QUANTITY_AVAILABILITY)
    ).withDefault(
      aid_data?.quantityAvailability ?? QUANTITY_AVAILABILITY.limited
    ),

    existingQuantity: parseAsInteger.withDefault(
      aid_data?.existingQuantity ?? 0
    ),

    delegateSinglePortion: parseAsInteger.withDefault(
      aid_data?.delegateSinglePortion ?? 0
    ),

    search: parseAsString.withDefault(''),

    delegate_page: parseAsInteger.withDefault(1),

    action: parseAsStringEnum<ACTION_ADD_EDIT>(
      Object.values(ACTION_ADD_EDIT)
    ).withDefault(ACTION_ADD_EDIT.ADD),
  });

  const initRemainingQuantity =
    (inDisplayedAid || inEditAid) &&
    aid_data?.distributionMechanism == DISTRIBUTION_MECHANISM.delegates_lists &&
    aid_data.quantityAvailability == QUANTITY_AVAILABILITY.limited
      ? aid_data.existingQuantity -
        aid_data.selectedDelegatesPortions.reduce(
          (sum, item) => sum + item.portion,
          0
        )
      : query.existingQuantity;

  const [remainingQuantity, setRemainingQuantity] = useState(
    initRemainingQuantity
  );

  useEffect(() => {
    const rem_qty = inDisplayedAid
      ? Number(
          selectedDelegatesPortions?.reduce(
            (sum, item) => sum + item.portion,
            0
          )
        )
      : query.delegatesPortions == DELEGATE_PORTIONS.equal &&
        selectedDelegatesPortions
      ? selectedDelegatesPortions?.length * query.delegateSinglePortion
      : Number(
          selectedDelegatesPortions?.reduce(
            (sum, item) => sum + item.portion,
            0
          )
        );
    setRemainingQuantity(query.existingQuantity - rem_qty);
  }, [
    selectedDelegatesPortions,
    query.delegateSinglePortion,
    query.delegatesPortions,
    query.existingQuantity,
    query.quantityAvailability,
  ]);

  // TODO:
  useEffect(() => {
    if (
      inEditAid &&
      query.delegatesPortions == DELEGATE_PORTIONS.equal &&
      selectedDelegatesPortions &&
      selectedDelegatesPortions?.length * query.delegateSinglePortion <
        query.existingQuantity &&
      setSelectedDelegatesPortions
    ) {
      const newDelegatesPortions = selectedDelegatesPortions.map(
        (item: SelectedDelegatePortion) => {
          return {
            ...item,
            portion: query.delegateSinglePortion,
          };
        }
      );

      setSelectedDelegatesPortions(newDelegatesPortions);
      console.log(
        '🚀 ~ useEffect ~ newDelegatesPortions:',
        newDelegatesPortions
      );
    } else if (
      inEditAid &&
      query.delegatesPortions == DELEGATE_PORTIONS.equal &&
      selectedDelegatesPortions &&
      selectedDelegatesPortions?.length * query.delegateSinglePortion >
        query.existingQuantity &&
      setSelectedDelegatesPortions
    ) {
      const newDelegatesPortions = selectedDelegatesPortions.map(
        (item: SelectedDelegatePortion) => {
          return {
            ...item,
            portion: 0,
          };
        }
      );
      setSelectedDelegatesPortions([]);

      console.log(
        '🚀 ~00 useEffect ~ newDelegatesPortions:',
        newDelegatesPortions
      );
    }
  }, [query.delegateSinglePortion, query.delegatesPortions]);

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, delegate_page: page }));
  };

  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const selectedDelegatesPortionsIDs =
    selectedDelegatesPortions?.map((item) => item.delegate_id) || [];

  const {
    data: delegatesData,
    isLoading: isLoadingRegular,
    error: queryError,
  } = useQuery<DelegatesResponse, Error>({
    queryKey: ['delegates', query, localFilters],
    queryFn: () =>
      getDelegates({
        page: query.delegate_page,
        limit: 7,
        search: query.search,
        filters: localFilters,
      }),
    enabled: inDelegates || inEditAid,
    retry: 1,
  });

  const {
    data: selectedDelegatesData,
    isLoading: isLoadingSelected,
    error: selectedQueryError,
  } = useQuery<DelegatesResponse, Error>({
    queryKey: [
      'delegates_selected',
      selectedDelegatesPortions,
      query.delegate_page,
    ],
    queryFn: () =>
      getDelegatesByIds({
        ids: selectedDelegatesPortions?.map((item) => item.delegate_id) || [],
        page: query.delegate_page,
        limit: 7,
        //TODO: add filter also
      }),
    enabled: inDisplayedAid,
    retry: 1,
  });

  const {
    data: allDelegatesIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[], Error>({
    queryKey: ['delegates_all', query.search, localFilters],
    queryFn: async () => {
      const response = await getDelegatesIDs({
        filters: localFilters,
      });
      return response.delegatesIDs;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
  });

  // const DELEGATES_DATA = delegatesData;
  const DELEGATES_DATA =
    destination == DESTINATION_DELEGATES.DISPLAY_AIDS
      ? selectedDelegatesData
      : delegatesData;

  // const data = isDisabled ? selectedDisplacedData : displacedData;
  const isLoading = isLoadingAll || isLoadingRegular;
  const error = allQueryError || queryError;

  useEffect(() => {
    if (DELEGATES_DATA) {
      setDelegatesNum(DELEGATES_DATA.pagination.totalItems);
    }
  }, [DELEGATES_DATA, setDelegatesNum]);

  useEffect(() => {
    if (allDelegatesIDs && selectAllAcrossPages && setSelectedRows) {
      setSelectedRows(allDelegatesIDs);
    }
  }, [allDelegatesIDs, selectAllAcrossPages, setSelectedRows]);

  const isRowSelected = (id: number) => {
    return inDelegates
      ? selectedRows?.includes(id)
      : selectedDelegatesPortionsIDs.includes(id);
  };

  const areAllPagesRowsSelected = () =>
    inDelegates
      ? selectedRows?.length ===
        (DELEGATES_DATA?.pagination?.totalItems || allDelegatesIDs?.length || 0)
      : selectedDelegatesPortions?.length ===
        (DELEGATES_DATA?.pagination?.totalItems ||
          allDelegatesIDs?.length ||
          0);

  const handleRowSelectionInDelegates = (id: number, checked: boolean) => {
    if (!setSelectedRows) return;

    if (checked) {
      setSelectedRows((prev) => [...prev.filter((rowId) => rowId !== id), id]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  const handleRowSelectionInAids = (id: number, checked: boolean) => {
    if (!setSelectedDelegatesPortions || !selectedDelegatesPortions) return;

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

        // setRemainingQuantity(
        //   query.existingQuantity -
        //     selectedDelegatesPortions.length * query.delegateSinglePortion
        // );
      }
      setSelectAllAcrossPages(false);
    }
  };

  const handleSelectAllAcrossAllPagesInDelegates = (checked: boolean) => {
    if (!DELEGATES_DATA?.delegates || !setSelectedRows) return;

    if (checked) {
      // Select all rows across all pages
      setSelectAllAcrossPages(true);
      setSelectedRows(allDelegatesIDs || []);
    } else {
      // Deselect all rows
      setSelectAllAcrossPages(false);
      setSelectedRows([]);
    }
  };

  const handleSelectAllAcrossAllPagesInAids = (selectAll: boolean) => {
    // Actually NO delegates
    if (
      !delegatesData?.delegates ||
      !setSelectedDelegatesPortions ||
      !selectedDelegatesPortions
    )
      return;

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

        const newSelectedPortions = (allDelegatesIDs ?? []).map((id) => ({
          delegate_id: id,
          portion,
        }));

        setSelectedDelegatesPortions(newSelectedPortions);

        if (
          query.quantityAvailability === QUANTITY_AVAILABILITY.limited &&
          portion > 0
        ) {
          setRemainingQuantity(
            query.existingQuantity - portion * (allDelegatesIDs?.length || 0) // or allDelegatesIDs?.length
          );
        }
      }
    } else {
      // setSelectAllAcrossPages(false);
      setSelectedDelegatesPortions([]);
      setRemainingQuantity(query.existingQuantity);
    }
  };

  const handlePortionChange = (delegateId: number, val: number) => {
    if (
      query.delegatesPortions !== DELEGATE_PORTIONS.manual ||
      !selectedDelegatesPortions ||
      !setSelectedDelegatesPortions
    )
      return;

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
        hidden={
          query.delegatesPortions === DELEGATE_PORTIONS.manual || inDisplayedAid
        }
      >
        <Checkbox
          aria-label='Select all rows across all pages'
          value={1}
          checked={areAllPagesRowsSelected()}
          onChange={(event) => {
            const selectAll = event.currentTarget.checked;
            console.log('🚀 ~ selectAll:', selectAll);
            // handleSelectAllAcrossAllPages(selectAll);

            inDelegates
              ? handleSelectAllAcrossAllPagesInDelegates(
                  event.currentTarget.checked
                )
              : handleSelectAllAcrossAllPagesInAids(
                  event.currentTarget.checked
                );
          }}
          disabled={!DELEGATES_DATA?.delegates?.length || inDisplayedAid}
          // disabled={inDisplayedAid}
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
      <Table.Th
        px={5}
        ta='center'
        w='fit-content'
        style={{ whiteSpace: 'nowrap' }}
        hidden={inDelegates}
      >
        عدد الأسماء
      </Table.Th>
      <Table.Th px={5} ta='center' w='fit-content' hidden={!inDelegates}>
        الإجراءات
      </Table.Th>
    </Table.Tr>
  );

  const portionInputValue = (element: Delegate) => {
    return inDisplayedAid && aid_data
      ? aid_data.selectedDelegatesPortions.find(
          (d) => d.delegate_id === element.id
        )?.portion
      : inEditAid &&
        query.delegatesPortions === DELEGATE_PORTIONS.equal &&
        selectedDelegatesPortions &&
        selectedDelegatesPortions.some((item) => item.delegate_id == element.id)
      ? query.delegateSinglePortion
      : inEditAid &&
        query.delegatesPortions === DELEGATE_PORTIONS.manual &&
        selectedDelegatesPortions &&
        selectedDelegatesPortions.some((item) => item.delegate_id == element.id)
      ? selectedDelegatesPortions.find((d) => d.delegate_id === element.id)
          ?.portion
      : 0;
  };

  const disabledPortionInputValue = (element: Delegate) => {
    return (
      inDisplayedAid ||
      query.delegatesPortions === DELEGATE_PORTIONS.equal ||
      (remainingQuantity == 0 &&
        !selectedDelegatesPortions?.some(
          (item) => item.delegate_id == element.id
        ))
    );
  };

  const maxPortionInputValue = (element: Delegate) => {
    return query.delegatesPortions === DELEGATE_PORTIONS.manual
      ? remainingQuantity +
          (selectedDelegatesPortions?.find((d) => d.delegate_id === element.id)
            ?.portion || 0)
      : remainingQuantity;
  };

  const rows = (DELEGATES_DATA?.delegates || []).map((element, index) => (
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
  ));

  return (
    <>
      <Text fz={18} fw={600} className='!text-primary'>
        الكمية المتبقية: {remainingQuantity} وحدة
      </Text>
      <Group
        flex={1}
        justify='space-between'
        align='center'
        wrap='nowrap'
        hidden={selectedRows?.length === 0}
      >
        {(selectAllAcrossPages ||
          selectedRows?.length === delegatesData?.pagination.totalItems) && (
          <Text size='md' fw={500} style={{ whiteSpace: 'nowrap' }}>
            تم تحديد جميع العناصر عبر جميع الصفحات
            {isLoadingAll && ' (جاري تحميل البيانات...)'}
            {allQueryError && ` (خطأ: ${allQueryError.message})`}
          </Text>
        )}
        {selectedRows?.length !== delegatesData?.pagination.totalItems &&
          (selectedRows?.length as number) > 0 && (
            <Text size='md' fw={500}>
              تم تحديد {selectedRows?.length} عنصر
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
        value={query.delegate_page}
        onChange={handlePageChange}
        total={DELEGATES_DATA?.pagination.totalPages || 0}
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
