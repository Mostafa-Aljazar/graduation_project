// components/actors/manager/aids-management/add/distribution-methods/customizable-category-input.tsx
'use client';

import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { DEFAULT_CATEGORIES } from '@/content/actor/manager/aids-management';
import { cn } from '@/utils/cn';
import {
  ActionIcon,
  Button,
  Group,
  MultiSelect,
  Stack,
  Text,
  Tooltip,
  Chip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Settings, Users } from 'lucide-react';
import { useState } from 'react';
import { Category_Management_Modal } from './category-management-modal';

interface CustomizableCategoryInputProps {
  value?: CategoryRangeType[];
  onChange?: (value: CategoryRangeType[]) => void;
  label: string;
  placeholder?: string;
  singlePortion: number;
  onPortionChange?: (categoryId: string, portion: number) => void;
  onCategoryAdd?: (categoryId: string, portion: number) => void;
}

export default function CustomizableCategoryInput({
  value = [],
  onChange,
  label,
  placeholder = 'اختر الفئات',
  onPortionChange,
  onCategoryAdd,
  singlePortion,
}: CustomizableCategoryInputProps) {
  const [categories, setCategories] =
    useState<CategoryRangeType[]>(DEFAULT_CATEGORIES);
  const [opened, { open, close }] = useDisclosure(false);
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
      portion: singlePortion,
    };

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? newCategory : cat))
      );
      onPortionChange?.(newCategory.id, singlePortion);
    } else {
      setCategories((prev) => [...prev, newCategory]);
      onCategoryAdd?.(newCategory.id, singlePortion);
      const updatedValue = [
        ...value,
        { ...newCategory, portion: singlePortion },
      ];
      onChange?.(updatedValue);
    }
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    if (value.some((v) => v.id === id)) {
      onChange?.(value.filter((v) => v.id !== id));
    }
  };

  const resetToDefault = () => {
    const updatedDefaultCategories = DEFAULT_CATEGORIES.map((cat) => ({
      ...cat,
      portion: singlePortion,
    }));
    setCategories(updatedDefaultCategories);
    onChange?.([]);
    updatedDefaultCategories.forEach((cat) => {
      onCategoryAdd?.(cat.id, singlePortion);
    });
  };

  const selectData = categories.map((cat) => ({
    value: cat.id,
    label: cat.label,
  }));

  const selectedIds = value.map((cat) => cat.id);
  const selectedCategories = categories.filter((cat) =>
    selectedIds.includes(cat.id)
  );

  return (
    <Stack gap='xs' w='100%'>
      <Group justify='space-between' align='center'>
        <Text fz={16} fw={500}>
          {label}
        </Text>
        <Tooltip label='إدارة الفئات'>
          <ActionIcon variant='light' className='!text-primary' onClick={open}>
            <Settings size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <MultiSelect
        placeholder={placeholder}
        data={selectData}
        value={selectedIds}
        onChange={(ids) => {
          const newValue = categories
            .filter((cat) => ids.includes(cat.id))
            .map((cat) => ({
              id: cat.id,
              label: cat.label,
              min: cat.min,
              max: cat.max,
              portion: singlePortion,
            }));
          onChange?.(newValue);
        }}
        size='sm'
        leftSection={<Users size={16} />}
        classNames={{
          input: 'placeholder:!text-sm !text-primary !font-medium',
        }}
        clearable
        searchable
        hidePickedOptions
        maxDropdownHeight={200}
        multiple
      />
      {selectedCategories.length > 0 && (
        <Stack gap='xs'>
          <Text size='sm' fw={500}>
            الفئات المختارة:
          </Text>
          <Group gap='xs'>
            {selectedCategories.map((category) => (
              <Chip
                key={category.id}
                checked={true}
                onChange={() => {
                  onChange?.(value.filter((v) => v.id !== category.id));
                }}
                variant='filled'
                size='sm'
                classNames={{
                  label: '!bg-primary/90',
                }}
              >
                <Text size='xs'>{category.label}</Text>
              </Chip>
            ))}
          </Group>
        </Stack>
      )}
      <Category_Management_Modal
        opened={opened}
        onClose={close}
        editingCategory={editingCategory}
        categories={categories}
        singlePortion={singlePortion}
        onAddCategory={addCategory}
        onEditCategory={(category) => setEditingCategory(category)}
        onDeleteCategory={deleteCategory}
        onResetToDefault={resetToDefault}
        onSetEditingCategory={setEditingCategory}
      />
    </Stack>
  );
}
