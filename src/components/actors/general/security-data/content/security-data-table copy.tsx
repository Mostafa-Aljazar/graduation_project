'use client';

import {
  Checkbox,
  Group,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
  TableScrollContainer,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { getSecurityData } from '@/actions/actors/general/security-data/getSecurityData';
import { MAN } from '@/assets/actor';

export default function Security_Data_Table() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [search] = useQueryState('search', parseAsString.withDefault(''));
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const {
    data: securityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['securities', page, search],
    queryFn: () => getSecurityData({ page, search }),
    retry: 1,
  });

  const {
    data: allDisplacedIDs,
    isLoading: isLoadingAll,
    error: allQueryError,
  } = useQuery<number[], Error>({
    queryKey: ['displaced_all', query.search, localFilters],
    queryFn: async () => {
      const response = await getDisplacedsIDs({
        filters: localFilters,
      });
      return response.displacedsIDs;
    },
    enabled: selectAllAcrossPages,
    retry: 1,
  });

  const securities = data?.securities || [];
  const totalPages = data?.pagination?.totalPages || 1;

  useEffect(() => {
    if (selectAll) {
      setSelectedIds(securities.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  }, [selectAll, securities]);

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
    if (!checked) setSelectAll(false);
  };

  const isRowSelected = (id: number) => selectedIds.includes(id);

  const renderRow = (security: ISecurityData) => (
    <Table.Tr
      key={security.id}
      bg={isRowSelected(security.id) ? 'var(--mantine-color-blue-light)' : ''}
    >
      <Table.Td w={40}>
        <Checkbox
          checked={isRowSelected(security.id)}
          onChange={(e) =>
            handleSelectRow(security.id, e.currentTarget.checked)
          }
        />
      </Table.Td>
      <Table.Td>
        <img
          src={MAN.src}
          alt={security.name}
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
        />
      </Table.Td>
      <Table.Td>{security.name}</Table.Td>
      <Table.Td>{security.nationalId}</Table.Td>
      <Table.Td>{security.gender}</Table.Td>
      <Table.Td>{security.mobileNumber}</Table.Td>
      <Table.Td>{security.originalAddress}</Table.Td>
      <Table.Td>{security.socialStatus}</Table.Td>
      <Table.Td>{security.role}</Table.Td>
    </Table.Tr>
  );

  return (
    <>
      <Group justify='space-between' align='center' mb='md'>
        <Text c='dimmed'>
          المختار: {selectedIds.length} من {securities.length}
        </Text>
      </Group>

      <TableScrollContainer minWidth='100%' pos='relative'>
        <LoadingOverlay visible={isLoading} zIndex={1000} />
        {error && (
          <Text c='red' ta='center'>
            {error.message}
          </Text>
        )}
        {!isLoading && securities.length === 0 && (
          <Text c='dimmed' ta='center'>
            لا يوجد أفراد أمن
          </Text>
        )}

        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          horizontalSpacing='md'
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>
                <Checkbox
                  aria-label='select all rows'
                  checked={selectAll}
                  onChange={(e) => setSelectAll(e.currentTarget.checked)}
                />
              </Table.Th>
              <Table.Th>الصورة</Table.Th>
              <Table.Th>الاسم</Table.Th>
              <Table.Th>الهوية</Table.Th>
              <Table.Th>الجنس</Table.Th>
              <Table.Th>الهاتف</Table.Th>
              <Table.Th>العنوان</Table.Th>
              <Table.Th>الحالة الاجتماعية</Table.Th>
              <Table.Th>الوظيفة</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{securities.map(renderRow)}</Table.Tbody>
        </Table>
      </TableScrollContainer>

      <Pagination
        value={page}
        onChange={setPage}
        total={totalPages}
        pt={20}
        radius='xl'
        size='sm'
        mx='auto'
        withControls={totalPages > 1}
      />
    </>
  );
}
