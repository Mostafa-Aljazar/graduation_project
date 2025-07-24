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
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { getSecurityData } from '@/actions/actors/general/security-data/getSecurityData';
import { getSecuritiesIds } from '@/actions/actors/general/security-data/getSecuritiesIds';
import Security_Data_Table_Actions from '../security-data-table-actions';
import { SecuritiesResponse } from '@/@types/actors/general/security-data/securitiesDataResponse.types';
import { ListChecks, ListX, Users } from 'lucide-react';

interface SecurityTableProps {
  setSecurityNum: (count: number) => void;
}

export default function Security_Data_Table({
  setSecurityNum,
}: SecurityTableProps) {
  const [query, setQuery] = useQueryStates(
    {
      security_page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(''),
    },
    { shallow: true }
  );

  const [selectedSecurityIds, setSelectedSecurityIds] = useState<number[]>([]);
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);

  const currentPage = query.security_page || 1;
  const limit = 7;
  const offset = (currentPage - 1) * limit;

  const {
    data: securityData,
    isLoading: isLoadingRegular,
    error: queryError,
  } = useQuery<SecuritiesResponse, Error>({
    queryKey: ['securities', query],
    queryFn: () =>
      getSecurityData({
        page: query.security_page,
        search: query.search,
        limit: 7,
      }),
    retry: 1,
  });

  const {
    data: allSecuritiesIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery({
    queryKey: ['securities_all_ids'],
    queryFn: async () => {
      const response = await getSecuritiesIds({ search: query.search });

      return response.security_Ids;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isLoadingAll || isLoadingRegular;
  const error = allQueryError || queryError;

  useEffect(() => {
    if (securityData) {
      setSecurityNum(securityData.pagination.total_items);
    }
  }, [securityData]);

  useEffect(() => {
    if (allSecuritiesIDs && selectAllAcrossPages) {
      setSelectedSecurityIds(allSecuritiesIDs);
    }
  }, [allSecuritiesIDs, selectAllAcrossPages]);

  const isRowSelected = (id: number) => selectedSecurityIds.includes(id);

  const areAllPagesRowsSelected = () =>
    selectedSecurityIds.length === (securityData?.pagination?.total_items || 0);

  const handleRowSelection = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedSecurityIds((prev) => [
        ...prev.filter((rowId) => rowId !== id),
        id,
      ]);
      if (areAllPagesRowsSelected()) setSelectAllAcrossPages(true);
    } else {
      setSelectedSecurityIds((prev) => prev.filter((rowId) => rowId !== id));
      setSelectAllAcrossPages(false);
    }
  };

  const handleSelectAllAcrossAllPages = (checked: boolean) => {
    if (checked) {
      setSelectAllAcrossPages(true);
      setSelectedSecurityIds(allSecuritiesIDs || []);
    } else {
      setSelectAllAcrossPages(false);
      setSelectedSecurityIds([]);
    }
  };

  const columns = (
    <Table.Tr>
      <Table.Th px={5} ta='center' style={{ width: 40 }}>
        <ActionIcon
          mx={'auto'}
          variant='light'
          aria-label='Select all rows across all pages'
          disabled={!securityData?.securities?.length}
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
        الاسم
      </Table.Th>
      <Table.Th px={5} ta='center'>
        رقم الهوية
      </Table.Th>
      <Table.Th px={5} ta='center'>
        رقم الجوال
      </Table.Th>
      <Table.Th px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
        الرتبة
      </Table.Th>
      <Table.Th px={5} ta='center'>
        الإجراءات
      </Table.Th>
    </Table.Tr>
  );

  const rows = useMemo(() => {
    return (securityData?.securities || []).map((element, index) => (
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
            mx={'auto'}
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
        <Table.Td px={5} ta='center'>
          {element.identity}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          {element.mobile_number}
        </Table.Td>
        <Table.Td px={5} ta='center' style={{ whiteSpace: 'nowrap' }}>
          {element.role}
        </Table.Td>
        <Table.Td px={5} ta='center'>
          <Security_Data_Table_Actions security_Id={element.id} />
        </Table.Td>
      </Table.Tr>
    ));
  }, [securityData, selectedSecurityIds]);

  const noSecurities = (
    <Table.Tr>
      <Table.Td colSpan={9}>
        <Center w='100%' py={30}>
          <Stack align='center' gap={8}>
            <ThemeIcon variant='light' radius='xl' size={50} color='gray'>
              <Users size={25} />
            </ThemeIcon>
            <Text ta='center' c='dimmed' fw={500} size='md'>
              لا توجد بيانات للأمن
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
        hidden={selectedSecurityIds.length === 0}
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
              تم تحديد {selectedSecurityIds.length} عنصر
            </Text>
          )}
        </Group>

        {selectedSecurityIds.length > 0 && (
          <Group justify='flex-end' flex={1}>
            <Security_Data_Table_Actions
              security_Ids={selectedSecurityIds}
              disabled={selectedSecurityIds?.length === 0 || isLoadingAll}
            />
          </Group>
        )}
      </Group>

      <Table.ScrollContainer minWidth='100%' pos='relative'>
        <LoadingOverlay
          visible={isLoading || isLoadingAll}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 0.3 }}
        />

        {error && (
          <Text c='red' ta='center'>
            {error.message}
            فشل في تحميل البيانات
          </Text>
        )}

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

          <Table.Tbody>{rows.length === 0 ? noSecurities : rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Pagination
        value={currentPage}
        onChange={(page) =>
          setQuery((prev) => ({ ...prev, security_page: page }))
        }
        total={securityData?.pagination?.total_pages || 0}
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
