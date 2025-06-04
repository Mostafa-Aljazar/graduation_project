'use client';

import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { DEFAULT_CATEGORIES } from '@/content/actor/manager/aids-management';
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
  Table,
  ScrollArea,
  MultiSelect,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Plus, Edit, Trash2, Users, Settings } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

interface PortionsManagementModalProps {
  selectedCategories: CategoryRangeType[];
  onCategoriesChange: (categories: CategoryRangeType[]) => void;
  onPortionChange: (categoryId: string, portion: number) => void;
  categoryPortions: Record<string, number>;
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

export default function PortionsManagementModal({
  selectedCategories,
  onCategoriesChange,
  onPortionChange,
  categoryPortions,
  onCategoryAdd,
}: PortionsManagementModalProps) {
  const [categories, setCategories] =
    useState<CategoryRangeType[]>(DEFAULT_CATEGORIES);
  const [managementOpened, { open: openManagement, close: closeManagement }] =
    useDisclosure(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryRangeType | null>(null);

  const form = useForm({
    initialValues: {
      label: '',
      min: 1,
      max: 3,
      isOpenEnded: false,
      portion: 1,
    },
    validate: zodResolver(categoryFormSchema),
  });

  const addCategory = (values: typeof form.values) => {
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

    form.reset();
    setEditingCategory(null);
    closeManagement();
  };

  const editCategory = (category: CategoryRangeType) => {
    setEditingCategory(category);
    form.setValues({
      label: category.label,
      min: category.min,
      max: category.max || 10,
      isOpenEnded: category.max === null,
      portion: category.portion || 1,
    });
    openManagement();
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
            <Text fz={18} fw={600} c='blue'>
              تحديد الحصص حسب عدد الأفراد
            </Text>
            <Tooltip label='إدارة الفئات'>
              <ActionIcon variant='light' color='blue' onClick={openManagement}>
                <Settings size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>

          <Stack gap='xs'>
            <Text fz={14} fw={500}>
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
            />
          </Stack>

          {selectedCategories.length > 0 && (
            <Stack gap='xs'>
              <Text fz={14} fw={500}>
                الفئات المختارة وحصصها:
              </Text>
              <ScrollArea h={300}>
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
                          <Badge variant='light' color='blue'>
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
                <Badge size='lg' color='green'>
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

      <Modal
        opened={managementOpened}
        onClose={closeManagement}
        title='إدارة فئات عدد الأفراد'
        size='lg'
        centered
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
                  {...form.getInputProps('portion')}
                  size='sm'
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
                    variant='outline'
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
                  leftSection={
                    editingCategory ? <Edit size={16} /> : <Plus size={16} />
                  }
                >
                  {editingCategory ? 'تحديث' : 'إضافة'}
                </Button>
              </Group>
            </form>
          </Paper>

          <Paper p='md' withBorder>
            <Group justify='space-between' mb='sm'>
              <Text fw={500}>الفئات الحالية:</Text>
              <Button variant='subtle' size='xs' onClick={resetToDefault}>
                إعادة الافتراضي
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
                      color='blue'
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
