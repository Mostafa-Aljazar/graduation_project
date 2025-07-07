'use client';

import { useEffect, useState } from 'react';
import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { getSecurityData } from '@/actions/actors/general/security-data/getSecurityData';
import { getSecuritiesIds } from '@/actions/actors/general/security-data/getSecuritiesIds';
import Security_Data_Table_Actions from '../security-data-table-actions';

interface SecurityTableProps {
  setSecurityNum: (count: number) => void;
}

export default function Security_Data_Table({
  setSecurityNum,
}: SecurityTableProps) {
  const [limit] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  console.log('🚀 ~ selectedRows:', selectedRows);
  const [selectAll, setSelectAll] = useState(false);
  console.log('🚀 ~ selectAll:', selectAll);

  const [query, setQuery] = useQueryStates({
    search: parseAsString.withDefault(''),
    security_page: parseAsInteger.withDefault(1),
  });

  const page = query.security_page;

  const {
    data: securityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['securities', query],
    queryFn: () =>
      getSecurityData({
        page,
        search: query.search,
        limit,
      }),
    retry: 1,
  });

  useEffect(() => {
    if (securityData) {
      setSecurityNum(securityData.pagination.totalItems);
    }
  }, [securityData]);

  const { data: allSecuritiesIDs, isLoading: isLoadingAll } = useQuery({
    queryKey: ['securities_all_ids', query.search],
    queryFn: async () => {
      const response = await getSecuritiesIds({ search: query.search });
      return response.securityIds;
    },
    enabled: selectAll,
    retry: 1,
  });

  useEffect(() => {
    if (selectAll && allSecuritiesIDs?.length) {
      setSelectedRows(allSecuritiesIDs);
    }
  }, [selectAll, allSecuritiesIDs]);

  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);
    if (!checked) setSelectedRows([]);
  };

  const handleRowChange = (id: number, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...new Set([...prev, id])] : prev.filter((i) => i !== id)
    );
    if (!checked) setSelectAll(false);
  };

  const areAllPageRowsSelected = () => {
    const pageIds = securityData?.securities.map((s) => s.id) || [];
    return pageIds.every((id) => selectedRows.includes(id));
  };

  const toggleSelectAllOnPage = (checked: boolean) => {
    const pageIds = securityData?.securities.map((s) => s.id) || [];
    setSelectedRows((prev) => {
      return checked
        ? Array.from(new Set([...prev, ...pageIds]))
        : prev.filter((id) => !pageIds.includes(id));
    });
    if (!checked) setSelectAll(false);
  };

  return (
    <>
      <Group justify='space-between' mb={10}>
        {selectedRows.length > 0 && (
          <Text>تم تحديد {selectedRows.length} عنصر</Text>
        )}

        {selectedRows.length > 0 && (
          <Security_Data_Table_Actions
            security_Ids={selectedRows}
            disabled={selectedRows?.length === 0 || isLoadingAll}
          />

          // <Displaced_Table_Actions
          //   disabled={selectedRows?.length === 0 || isLoadingAll}
          //   displaced_IDs={selectedRows}
          // />
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
            فشل في تحميل البيانات
          </Text>
        )}

        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta='center'>
                <Checkbox
                  aria-label='Select all securities'
                  checked={selectAll}
                  indeterminate={!selectAll && selectedRows.length > 0}
                  onChange={(e) => {
                    const checked = e.currentTarget.checked;
                    setSelectAll(checked);
                    if (checked) {
                      // تحديد كل الـ IDs من كل الصفحات
                      if (allSecuritiesIDs?.length) {
                        setSelectedRows(allSecuritiesIDs);
                      }
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  disabled={isLoadingAll}
                />
              </Table.Th>

              <Table.Th ta='center'>#</Table.Th>
              <Table.Th ta='center'>الاسم</Table.Th>
              <Table.Th ta='center'>رقم الهوية</Table.Th>
              <Table.Th ta='center'>رقم الجوال</Table.Th>
              <Table.Th ta='center'>الجنس</Table.Th>
              <Table.Th ta='center'>الحالة الاجتماعية</Table.Th>
              <Table.Th ta='center'>الرتبة</Table.Th>
              <Table.Th ta='center'>التحكم</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {(securityData?.securities || []).map((security, index) => (
              <Table.Tr
                key={security.id}
                bg={
                  selectedRows.includes(security.id)
                    ? 'var(--mantine-color-blue-light)'
                    : undefined
                }
              >
                <Table.Td ta='center'>
                  <Checkbox
                    checked={selectedRows.includes(security.id)}
                    onChange={(e) =>
                      handleRowChange(security.id, e.currentTarget.checked)
                    }
                  />
                </Table.Td>
                <Table.Td ta='center'>
                  {(page - 1) * limit + index + 1}
                </Table.Td>
                <Table.Td ta='center'>{security.name}</Table.Td>
                <Table.Td ta='center'>{security.identity}</Table.Td>
                <Table.Td ta='center'>{security.mobileNumber}</Table.Td>
                <Table.Td ta='center'>{security.gender}</Table.Td>
                <Table.Td ta='center'>{security.socialStatus}</Table.Td>
                <Table.Td ta='center'>{security.job}</Table.Td>
                <Table.Th ta='center'>
                  <Security_Data_Table_Actions security_Id={security.id} />
                </Table.Th>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Group justify='center'>
        <Pagination
          value={page}
          onChange={(val) => setQuery({ security_page: val })}
          total={securityData?.pagination.totalPages || 1}
          pt={20}
          size='sm'
          radius='xl'
          withControls={false}
        />
      </Group>
    </>
  );
}
