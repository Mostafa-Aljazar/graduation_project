// components/common/category-management-modal.tsx
'use client';

import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';
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
  Badge,
  Modal,
  SimpleGrid,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { z } from 'zod';

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

interface CategoryManagementModalProps {
  opened: boolean;
  onClose: () => void;
  editingCategory: CategoryRangeType | null;
  categories: CategoryRangeType[];
  singlePortion: number;
  onAddCategory: (values: {
    label: string;
    min: number;
    max: number | null;
    portion: number;
    isOpenEnded: boolean;
  }) => void;
  onEditCategory: (category: CategoryRangeType) => void;
  onDeleteCategory: (id: string) => void;
  onResetToDefault: () => void;
  onSetEditingCategory: (category: CategoryRangeType | null) => void;
}

export function Category_Management_Modal({
  opened,
  onClose,
  editingCategory,
  categories,
  singlePortion,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onResetToDefault,
  onSetEditingCategory,
}: CategoryManagementModalProps) {
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

  const handleSubmit = (values: typeof form.values) => {
    onAddCategory(values);
    form.reset();
    onSetEditingCategory(null);
  };

  const handleEdit = (category: CategoryRangeType) => {
    onSetEditingCategory(category);
    form.setValues({
      label: category.label,
      min: category.min,
      max: category.max || 10,
      isOpenEnded: category.max === null,
      portion: singlePortion,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
          <form onSubmit={form.onSubmit(handleSubmit)} id='add-target'>
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
                    form.setFieldValue('isOpenEnded', !form.values.isOpenEnded)
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
                    onSetEditingCategory(null);
                    form.reset();
                  }}
                >
                  إلغاء
                </Button>
              )}
              <Button
                form='add-target'
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
              onClick={onResetToDefault}
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
                  {category.is_default && (
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
                    onClick={() => handleEdit(category)}
                  >
                    <Edit size={14} />
                  </ActionIcon>
                  {!category.is_default && (
                    <ActionIcon
                      variant='light'
                      color='red'
                      size='sm'
                      onClick={() => onDeleteCategory(category.id)}
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
  );
}
