// components/actors/manager/aids-management/add/distribution-methods/portions-management-modal.tsx
'use client';

import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { DEFAULT_CATEGORIES } from '@/content/actor/manager/aids-management';
import { cn } from '@/utils/cn';
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Settings, Users } from 'lucide-react';
import { useState } from 'react';
import { Category_Management_Modal } from './category-management-modal';

interface PortionsManagementModalProps {
  selectedCategories: CategoryRangeType[];
  onCategoriesChange: (categories: CategoryRangeType[]) => void;
  onPortionChange: (categoryId: string, portion: number) => void;
  categoryPortions: Record<string, number>;
  onCategoryAdd?: (categoryId: string, portion: number) => void;
  isDisabled: boolean;
}

export default function PortionsManagementModal({
  selectedCategories,
  onCategoriesChange,
  onPortionChange,
  categoryPortions,
  onCategoryAdd,
  isDisabled,
}: PortionsManagementModalProps) {
  const [categories, setCategories] =
    useState<CategoryRangeType[]>(DEFAULT_CATEGORIES);
  const [managementOpened, { open: openManagement, close: closeManagement }] =
    useDisclosure(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryRangeType | null>(null);

  const addCategory = (values: {
    label: string;
    min: number;
    max: number | null;
    portion: number;
    isOpenEnded: boolean;
  }) => {
    const newCategory: CategoryRangeType = {
      id: values.label,
      label: values.label,
      min: values.min,
      max: values.isOpenEnded ? null : values.max,
      portion: values.portion,
    };

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? newCategory : cat))
      );
      onPortionChange(newCategory.id, newCategory.portion || 1);
    } else {
      setCategories((prev) => [...prev, newCategory]);
      onCategoryAdd?.(newCategory.id, newCategory.portion || 1);
    }

    setEditingCategory(null);
    closeManagement();
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    if (selectedCategories.some((cat) => cat.id === id)) {
      onCategoriesChange(selectedCategories.filter((cat) => cat.id !== id));
    }
  };

  const resetToDefault = () => {
    setCategories(DEFAULT_CATEGORIES);
    onCategoriesChange([]);
    DEFAULT_CATEGORIES.forEach((cat) => {
      onCategoryAdd?.(cat.id, cat.portion || 1);
    });
  };

  const updateCategoryPortion = (categoryId: string, portion: number) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, portion } : cat))
    );
    const updatedSelectedCategories = selectedCategories.map((cat) =>
      cat.id === categoryId ? { ...cat, portion } : cat
    );
    onCategoriesChange(updatedSelectedCategories);
    onPortionChange(categoryId, portion);
  };

  const selectData = categories.map((cat) => ({
    value: cat.id,
    label: cat.label,
  }));

  return (
    <Stack gap='md' w='100%'>
      <Paper p='md' withBorder>
        <Stack gap='md'>
          <Group justify='space-between' align='center'>
            <Text fz={17} fw={600} className='!text-primary'>
              تحديد الحصص حسب عدد الأفراد
            </Text>
            <Tooltip label='إدارة الفئات'>
              <ActionIcon
                variant='light'
                className='!text-primary'
                onClick={openManagement}
                disabled={isDisabled}
              >
                <Settings size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Stack gap='xs'>
            <Text fz={16} fw={500}>
              اختر الفئات المطلوبة:
            </Text>
            <MultiSelect
              placeholder='اختر فئة أو أكثر من فئات عدد الأفراد'
              data={selectData}
              value={selectedCategories.map((cat) => cat.id)}
              onChange={(ids) => {
                const newSelectedCategories = categories.filter((cat) =>
                  ids.includes(cat.id)
                );
                onCategoriesChange(newSelectedCategories);
              }}
              size='sm'
              leftSection={<Users size={16} />}
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
              clearable
              searchable
              hidePickedOptions
              maxDropdownHeight={200}
              multiple
              disabled={isDisabled}
            />
          </Stack>
          {selectedCategories.length > 0 && (
            <Stack gap='xs'>
              <Text fz={14} fw={500}>
                الفئات المختارة وحصياتها:
              </Text>
              <ScrollArea h={250}>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>الفئة</Table.Th>
                      <Table.Th>عدد الأفراد</Table.Th>
                      <Table.Th>الحصة المخصصة</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedCategories.map((category) => (
                      <Table.Tr key={category.id}>
                        <Table.Td>{category.label}</Table.Td>
                        <Table.Td>
                          <Badge variant='light' className='!text-primary'>
                            {category.max
                              ? `${category.min}-${category.max}`
                              : `${category.min}+`}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <NumberInput
                            value={
                              categoryPortions[category.id] ||
                              category.portion ||
                              1
                            }
                            onChange={(value) =>
                              updateCategoryPortion(category.id, Number(value))
                            }
                            min={1}
                            size='xs'
                            w={80}
                            disabled={isDisabled}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
              <Group justify='space-between' mt='md'>
                <Text size='sm' c='dimmed'>
                  إجمالي الفئات المختارة: {selectedCategories.length}
                </Text>
                <Badge size='lg' className='!text-primary'>
                  إجمالي الحصص:{' '}
                  {selectedCategories.reduce(
                    (total, cat) =>
                      total + (categoryPortions[cat.id] || cat.portion || 1),
                    0
                  )}
                </Badge>
              </Group>
            </Stack>
          )}
        </Stack>
      </Paper>
      <Category_Management_Modal
        opened={managementOpened}
        onClose={closeManagement}
        editingCategory={editingCategory}
        categories={categories}
        singlePortion={1} // You can adjust this as needed
        onAddCategory={addCategory}
        onEditCategory={(category) => setEditingCategory(category)}
        onDeleteCategory={deleteCategory}
        onResetToDefault={resetToDefault}
        onSetEditingCategory={setEditingCategory}
      />
    </Stack>
  );
}
