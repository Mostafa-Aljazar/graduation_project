'use client';
import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { DEFAULT_CATEGORIES } from '@/content/actor/manager/aids-management';
import { cn } from '@/utils/cn';
import {
  ActionIcon,
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  TextInput,
  Tooltip,
  Badge,
  Modal,
  SimpleGrid,
  MultiSelect,
  Chip,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Edit, Trash2, Users, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { z } from 'zod';

interface CustomizableCategoryInputProps {
  value?: CategoryRangeType[];
  onChange?: (value: CategoryRangeType[]) => void;
  label: string;
  placeholder?: string;
  singlePortion: number;
  onPortionChange?: (categoryId: string, portion: number) => void;
  onCategoryAdd?: (categoryId: string, portion: number) => void;
}

const categoryFormSchema = z
  .object({
    label: z.string().min(2, { message: 'يجب أن يكون التسمية أطول من حرفين' }),
    min: z.number().min(1, { message: 'يجب أن يكون الحد الأدنى 1 على الأقل' }),
    max: z.number().nullable(),
    portion: z.number().min(1, { message: 'يجب أن تكون الحصة 1 على الأقل' }),
    isOpenEnded: z.boolean(),
  })
  .refine(
    (data) => data.isOpenEnded || (data.max !== null && data.max > data.min),
    {
      message: 'يجب أن يكون الحد الأقصى أكبر من الحد الأدنى',
      path: ['max'],
    }
  );

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

  const form = useForm({
    initialValues: {
      label: '',
      min: 1,
      max: 3,
      isOpenEnded: false,
      portion: singlePortion,
    },
    validate: zodResolver(categoryFormSchema),
  });

  useEffect(() => {
    if (form.values.portion !== singlePortion) {
      form.setFieldValue('portion', singlePortion);
    }
  }, [singlePortion]);

  const addCategory = (values: typeof form.values) => {
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

    form.reset();
    setEditingCategory(null);
    close();
  };

  const editCategory = (category: CategoryRangeType) => {
    setEditingCategory(category);
    form.setValues({
      label: category.label,
      min: category.min,
      max: category.max || 10,
      isOpenEnded: category.max === null,
      portion: singlePortion,
    });
    open();
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
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text fz={18} fw={600} ta='center' className='!text-primary'>
            إدارة فئات عدد الأفراد
          </Text>
        }
        size='lg'
        centered
        classNames={{
          title: '!w-full',
        }}
      >
        <Stack gap='md'>
          <Paper p='md' withBorder>
            <Text fw={500} mb='sm'>
              {editingCategory ? 'تعديل الفئة' : 'إضافة فئة جديدة'}:
            </Text>
            <form onSubmit={form.onSubmit(addCategory)}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm'>
                <TextInput
                  label='تسمية الفئة'
                  placeholder='مثال: 1-3 أفراد'
                  {...form.getInputProps('label')}
                  size='sm'
                />
                <NumberInput
                  label='الحد الأدنى'
                  placeholder='1'
                  min={1}
                  {...form.getInputProps('min')}
                  size='sm'
                />
                {!form.values.isOpenEnded && (
                  <NumberInput
                    label='الحد الأقصى'
                    placeholder='3'
                    min={form.values.min + 1}
                    {...form.getInputProps('max')}
                    size='sm'
                  />
                )}
                <NumberInput
                  label='الحصة المخصصة'
                  placeholder='1'
                  min={1}
                  value={singlePortion}
                  onChange={(value) =>
                    form.setFieldValue('portion', Number(value))
                  }
                  size='sm'
                  disabled
                />
                <Group align='end'>
                  <Button
                    variant={form.values.isOpenEnded ? 'filled' : 'outline'}
                    size='sm'
                    onClick={() =>
                      form.setFieldValue(
                        'isOpenEnded',
                        !form.values.isOpenEnded
                      )
                    }
                    className={cn(
                      form.values.isOpenEnded
                        ? '!bg-primary'
                        : '!border-primary !text-primary'
                    )}
                  >
                    {form.values.isOpenEnded
                      ? 'مفتوح (أكثر من)'
                      : 'مغلق (نطاق محدد)'}
                  </Button>
                </Group>
              </SimpleGrid>
              <Group justify='flex-end' mt='md'>
                {editingCategory && (
                  <Button
                    size='sm'
                    variant='outline'
                    color={'red'}
                    onClick={() => {
                      setEditingCategory(null);
                      form.reset();
                    }}
                  >
                    إلغاء
                  </Button>
                )}
                <Button
                  type='submit'
                  size='sm'
                  leftSection={
                    editingCategory ? <Edit size={16} /> : <Plus size={16} />
                  }
                  className='!bg-primary'
                >
                  {editingCategory ? 'تحديث' : 'إضافة'}
                </Button>
              </Group>
            </form>
          </Paper>
          <Paper p='md' withBorder>
            <Group justify='space-between' mb='sm'>
              <Text fw={500}>الفئات الحالية:</Text>
              <Button
                variant='outline'
                size='xs'
                color='gray'
                onClick={resetToDefault}
              >
                الافتراضي
              </Button>
            </Group>
            <Stack gap='xs'>
              {categories.map((category) => (
                <Group key={category.id} justify='space-between' align='center'>
                  <Group gap='xs'>
                    <Badge variant='light' color='blue'>
                      {category.max
                        ? `${category.min}-${category.max}`
                        : `${category.min}+`}
                    </Badge>
                    <Text size='sm'>{category.label}</Text>
                    {category.isDefault && (
                      <Badge size='xs' color='gray'>
                        افتراضي
                      </Badge>
                    )}
                    <Badge size='xs' color='green'>
                      الحصة: {category.portion || 1}
                    </Badge>
                  </Group>
                  <Group gap='xs'>
                    <ActionIcon
                      variant='light'
                      color='green'
                      size='sm'
                      onClick={() => editCategory(category)}
                    >
                      <Edit size={14} />
                    </ActionIcon>
                    {!category.isDefault && (
                      <ActionIcon
                        variant='light'
                        color='red'
                        size='sm'
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 size={14} />
                      </ActionIcon>
                    )}
                  </Group>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Modal>
    </Stack>
  );
}
