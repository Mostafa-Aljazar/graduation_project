'use client';

import {
  Group,
  NumberInput,
  Radio,
  Select,
  Text,
  TextInput,
  Stack,
  Textarea,
  SimpleGrid,
  Flex,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import {
  Calendar,
  MapPin,
  Package,
  Tag,
  Shield,
  Gauge,
  Boxes,
  Divide,
  Users,
  List,
  TableOfContents,
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from '@mantine/form';
import { zodResolver } from '@/lib/zod-resolver';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import {
  addAidFormSchema,
  AddAidFormValuesType,
} from '@/validation/actor/manager/aids-management/add-aid-form-schema';
import {
  Aid,
  CategoryRangeType,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import {
  DELEGATE_PORTIONS,
  DISTRIBUTION_MECHANISM,
  DISTRIBUTION_METHOD,
  GET_AIDS_TYPE_ICONS,
  QUANTITY_AVAILABILITY,
  TYPE_AIDS,
  TYPE_AIDS_LABELS,
} from '@/@types/actors/common-types/index.type';
import CustomizableCategoryInput from './distribution-methods/customizable-category-input';
import PortionsManagementModal from './distribution-methods/portions-management-modal';

interface AddFormProps {
  onSubmit?: (values: AddAidFormValuesType) => void;
  initialData?: Aid;
  isDisabled?: boolean;
}

export default function Common_Aid_Form({
  onSubmit,
  initialData,
  isDisabled = false,
}: AddFormProps) {
  const [query, setQuery] = useQueryStates({
    existingQuantity: parseAsInteger.withDefault(initialData?.existing_quantity || 0),
    distributionMechanism: parseAsStringEnum<DISTRIBUTION_MECHANISM>(
      Object.values(DISTRIBUTION_MECHANISM)
    ).withDefault(initialData?.distribution_mechanism || DISTRIBUTION_MECHANISM.DELEGATES_LISTS),
    delegatesPortions: parseAsStringEnum<DELEGATE_PORTIONS>(
      Object.values(DELEGATE_PORTIONS)
    ).withDefault(
      initialData?.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS
        ? initialData?.delegates_portions
        : DELEGATE_PORTIONS.EQUAL
    ),
    quantityAvailability: parseAsStringEnum<QUANTITY_AVAILABILITY>(
      Object.values(QUANTITY_AVAILABILITY)
    ).withDefault(initialData?.quantity_availability || QUANTITY_AVAILABILITY.LIMITED),
    distributionMethod: parseAsStringEnum<DISTRIBUTION_METHOD>(
      Object.values(DISTRIBUTION_METHOD)
    ).withDefault(initialData?.distribution_method || DISTRIBUTION_METHOD.EQUAL),
    delegateSinglePortion: parseAsInteger.withDefault(
      initialData?.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS
        ? (initialData?.delegate_single_portion as number)
        : 0
    ),
  });

  useEffect(() => {
    form.setFieldValue('existing_quantity', query.existingQuantity);
  }, [query.existingQuantity]);

  const [categoryPortions, setCategoryPortions] = useState<Record<string, number>>(
    (initialData?.selected_categories &&
      initialData.selected_categories.reduce(
        (acc, cat) => ({ ...acc, [cat.id]: cat.portion || 1 }),
        {}
      )) ||
      {}
  );

  const form = useForm<AddAidFormValuesType>({
    initialValues: initialData || {
      aid_name: '',
      aid_type: '' as TYPE_AIDS,
      aid_content: '',
      delivery_date: new Date('2025-06-15T00:00:00'),
      delivery_location: '',
      security_required: false,
      quantity_availability: query.quantityAvailability,
      existing_quantity: query.existingQuantity || 1,
      displaced_single_portion: 1,
      distribution_method: query.distributionMethod,
      selected_categories: [],
      distribution_mechanism: query.distributionMechanism,
      delegates_portions: query.delegatesPortions,
      delegate_single_portion: query.delegateSinglePortion || 1,
      additional_notes: '',
    },
    validate: zodResolver(addAidFormSchema),
  });

  const handlePortionChange = useCallback(
    (categoryId: string, portion: number) => {
      if (isDisabled) return;
      setCategoryPortions((prev) => ({
        ...prev,
        [categoryId]: portion,
      }));
      const updatedCategories = form.values.selected_categories.map((cat) =>
        cat.id === categoryId ? { ...cat, portion } : cat
      );
      form.setFieldValue('selected_categories', updatedCategories);
    },
    [form, isDisabled]
  );

  const handleCategoryAdd = (categoryId: string, portion: number) => {
    if (isDisabled) return;
    setCategoryPortions((prev) => ({ ...prev, [categoryId]: portion }));
  };

  const synchronizePortions = (cats: CategoryRangeType[]) => {
    if (
      form.values.distribution_method === DISTRIBUTION_METHOD.EQUAL &&
      cats.length > 0 &&
      !isDisabled
    ) {
      const updatedCategories = cats.map((cat) => ({
        ...cat,
        portion: form.values.displaced_single_portion,
      }));

      const hasChanges = updatedCategories.some(
        (cat, index) => cat.portion !== (form.values.selected_categories[index]?.portion ?? 1)
      );

      if (hasChanges) {
        form.setFieldValue('selected_categories', updatedCategories);
        updatedCategories.forEach((cat) => {
          setCategoryPortions((prev) => ({
            ...prev,
            [cat.id]: form.values.displaced_single_portion as number,
          }));
        });
      }
    }
  };

  useEffect(() => {
    synchronizePortions(form.values.selected_categories);
  }, [form.values.distribution_method, form.values.displaced_single_portion]);

  const calculateTotalAid = () => {
    if (form.values.selected_categories.length === 0) return null;

    if (form.values.distribution_method === DISTRIBUTION_METHOD.EQUAL) {
      return (
        (form.values.displaced_single_portion as number) * form.values.selected_categories.length
      );
    } else {
      return form.values.selected_categories.reduce(
        (total, category) => total + (categoryPortions[category.id] ?? category.portion ?? 1),
        0
      );
    }
  };

  const handleSubmit = (values: AddAidFormValuesType) => {
    console.log('🚀 ~ handleSubmit ~ values:', values);
    if (isDisabled) return;
    if (onSubmit) onSubmit(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} id='add-aid-form'>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
        <TextInput
          label={
            <Text fz={16} fw={500}>
              عنوان المساعدة:
            </Text>
          }
          w='100%'
          placeholder='عنوان المساعدة'
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          size='sm'
          leftSection={<Tag size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('aid_name')}
        />

        <Select
          label={
            <Text fz={16} fw={500}>
              نوع المساعدة:
            </Text>
          }
          w='100%'
          placeholder='نوع المساعدة'
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          data={Object.entries(TYPE_AIDS).map(([key, value]) => ({
            value: value,
            label: TYPE_AIDS_LABELS[value],
          }))}
          size='sm'
          clearable
          leftSection={<Package size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('aid_type')}
          renderOption={({ option, checked }) => {
            const Icon = GET_AIDS_TYPE_ICONS[option.value as TYPE_AIDS];
            return (
              <Group gap='xs' wrap='nowrap'>
                {Icon && <Icon size={16} />}
                <Text size='md'>{option.label}</Text>
              </Group>
            );
          }}
        />

        <TextInput
          label={
            <Text fz={16} fw={500}>
              محتوى المساعدة:
            </Text>
          }
          w='100%'
          placeholder='محتوى المساعدة'
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          size='sm'
          leftSection={<TableOfContents size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('aid_content')}
        />
        <DateTimePicker
          label={
            <Text fz={16} fw={500}>
              موعد التسليم:
            </Text>
          }
          w='100%'
          placeholder='اختر التاريخ والوقت'
          size='sm'
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          value={form.values.delivery_date}
          onChange={(date) =>
            !isDisabled &&
            form.setFieldValue('delivery_date', date ? new Date(date) : form.values.delivery_date)
          }
          leftSection={<Calendar size={16} />}
          error={form.errors.deliveryDate}
          valueFormat='DD/MM/YYYY hh:mm A'
          disabled={isDisabled}
        />
        <TextInput
          label={
            <Text fz={16} fw={500}>
              مكان التسليم:
            </Text>
          }
          w='100%'
          placeholder='مكان التسليم'
          size='sm'
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          leftSection={<MapPin size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('delivery_location')}
        />
        <Stack gap='xs'>
          <Group gap={5}>
            <Shield size={16} />
            <Text fz={16} fw={500}>
              يلزم تأمين:
            </Text>
          </Group>
          <Radio.Group
            w='100%'
            value={form.values.security_required?.toString()}
            onChange={(value) =>
              !isDisabled && form.setFieldValue('security_required', value === 'true')
            }
          >
            <Group w={{ base: '100%', md: '60%' }} gap={30} wrap='nowrap' align='center'>
              <Radio
                value='false'
                label={
                  <Text fz={15} fw={500}>
                    لا
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
              <Radio
                value='true'
                label={
                  <Text fz={15} fw={500}>
                    نعم
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
            </Group>
            {form.errors.security_required && (
              <Text c='red' size='xs'>
                {form.errors.security_required}
              </Text>
            )}
          </Radio.Group>
        </Stack>
        <Stack gap='xs'>
          <Group gap={5}>
            <Gauge size={16} />
            <Text fz={16} fw={500}>
              مقدار الكمية الموجودة:
            </Text>
          </Group>
          <Radio.Group
            w='100%'
            value={form.values.quantity_availability}
            onChange={(value) => {
              if (!isDisabled) {
                form.setFieldValue('quantity_availability', value as QUANTITY_AVAILABILITY);
                setQuery({
                  quantityAvailability: value as QUANTITY_AVAILABILITY,
                });
              }
            }}
          >
            <Group w={{ base: '100%', md: '60%' }} gap={30} wrap='nowrap' align='center'>
              <Radio
                value={QUANTITY_AVAILABILITY.LIMITED}
                label={
                  <Text fz={15} fw={500}>
                    محدود
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
              <Radio
                value={QUANTITY_AVAILABILITY.UNLIMITED}
                label={
                  <Text fz={15} fw={500}>
                    غير محدود
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
            </Group>
            {form.errors.quantity_availability && (
              <Text c='red' size='xs'>
                {form.errors.quantity_availability}
              </Text>
            )}
          </Radio.Group>
        </Stack>
        <NumberInput
          label={
            <Text fz={16} fw={500}>
              الكمية الموجودة:
            </Text>
          }
          w='100%'
          placeholder='700'
          size='sm'
          min={1}
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          leftSection={<Boxes size={16} />}
          value={form.values.existing_quantity}
          onChange={(value) => {
            if (!isDisabled) {
              form.setFieldValue('existing_quantity', Number(value));
              setQuery({ existingQuantity: value as number });
            }
          }}
          disabled={isDisabled}
        />
        <NumberInput
          label={
            <Text fz={16} fw={500}>
              الحصة الواحدة:
            </Text>
          }
          w='100%'
          placeholder='1'
          size='sm'
          min={1}
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          leftSection={<Divide size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('displaced_single_portion')}
          allowDecimal={false}
        />
        <Stack gap='xs'>
          <Group gap={5}>
            <Users size={16} />
            <Text fz={16} fw={500}>
              حصة كل عائلة:
            </Text>
          </Group>
          <Radio.Group
            w='100%'
            value={form.values.distribution_method}
            onChange={(value) =>
              !isDisabled && form.setFieldValue('distribution_method', value as DISTRIBUTION_METHOD)
            }
            // disabled={isDisabled}
          >
            <Group w={{ base: '100%', md: '60%' }} gap={30} wrap='nowrap' align='center'>
              <Radio
                value={DISTRIBUTION_METHOD.EQUAL}
                label={
                  <Text fz={15} fw={500}>
                    بالتساوي
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
              <Radio
                value={DISTRIBUTION_METHOD.FAMILY_NUMBER}
                label={
                  <Text fz={15} fw={500} className='!text-nowrap'>
                    حسب عدد الأفراد
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
            </Group>
            {form.errors.distribution_method && (
              <Text c='red' size='xs'>
                {form.errors.distribution_method}
              </Text>
            )}
          </Radio.Group>
        </Stack>
        {form.values.distribution_method === DISTRIBUTION_METHOD.EQUAL && (
          <Stack gap={0} style={{ gridColumn: '1 / -1' }}>
            <CustomizableCategoryInput
              value={form.values.selected_categories}
              onChange={(value) => {
                if (!isDisabled) {
                  form.setFieldValue('selected_categories', value);
                  synchronizePortions(value);
                }
              }}
              label='فئات عدد أفراد العائلة:'
              placeholder='اختر فئة أو أكثر من فئات عدد الأفراد'
              singlePortion={form.values.displaced_single_portion as number}
              onPortionChange={handlePortionChange}
              onCategoryAdd={handleCategoryAdd}
              isDisabled={isDisabled}
            />
            {form.errors.selected_categories && (
              <Text c='red' size='xs'>
                {form.errors.selected_categories}
              </Text>
            )}
          </Stack>
        )}
        {form.values.distribution_method === DISTRIBUTION_METHOD.FAMILY_NUMBER && (
          <Stack gap={0} style={{ gridColumn: '1 / -1' }}>
            <PortionsManagementModal
              selectedCategories={form.values.selected_categories}
              onCategoriesChange={(value) =>
                !isDisabled && form.setFieldValue('selected_categories', value)
              }
              onPortionChange={handlePortionChange}
              categoryPortions={categoryPortions}
              onCategoryAdd={handleCategoryAdd}
              isDisabled={isDisabled}
            />
            {form.errors.selected_categories && (
              <Text c='red' size='xs'>
                {form.errors.selected_categories}
              </Text>
            )}
          </Stack>
        )}
        <Stack gap='xs'>
          <Group gap={5}>
            <List size={16} />
            <Text fz={16} fw={500}>
              آلية التوزيع:
            </Text>
          </Group>
          <Radio.Group
            w='100%'
            value={form.values.distribution_mechanism}
            onChange={(value) => {
              if (!isDisabled) {
                form.setFieldValue('distribution_mechanism', value as DISTRIBUTION_MECHANISM);
                setQuery({
                  distributionMechanism: value as DISTRIBUTION_MECHANISM,
                });
              }
            }}
            // disabled={isDisabled}
          >
            <Flex
              direction='row'
              wrap={{ base: 'wrap', md: 'wrap' }}
              w={{ base: '100%' }}
              gap={{ base: 10, md: 20 }}
              align='center'
            >
              <Radio
                value={DISTRIBUTION_MECHANISM.DELEGATES_LISTS}
                label={
                  <Text fz={16} fw={500} className='text-nowrap'>
                    بناءً على كشوفات المناديب
                  </Text>
                }
                size='xs'
                disabled={isDisabled}
              />
              <Radio
                value={DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES}
                label={
                  <Text fz={16} fw={500} className='text-nowrap'>
                    بناءً على العائلات النازحة
                  </Text>
                }
                size='xs'
                disabled={isDisabled}
              />
            </Flex>
            {form.errors.distribution_mechanism && (
              <Text c='red' size='xs'>
                {form.errors.distribution_mechanism}
              </Text>
            )}
          </Radio.Group>
        </Stack>
        {form.values.distribution_mechanism === DISTRIBUTION_MECHANISM.DELEGATES_LISTS && (
          <>
            <Stack gap='xs'>
              <Group gap={5}>
                <Users size={16} />
                <Text fz={16} fw={500}>
                  حصص المناديب:
                </Text>
              </Group>
              <Radio.Group
                w='100%'
                value={form.values.delegates_portions}
                onChange={(value) => {
                  if (!isDisabled) {
                    form.setFieldValue('delegates_portions', value as DELEGATE_PORTIONS);
                    setQuery({ delegatesPortions: value as DELEGATE_PORTIONS });
                  }
                }}
                // disabled={isDisabled}
              >
                <Group w={{ base: '100%', md: '60%' }} gap={30} wrap='nowrap' align='center'>
                  <Radio
                    value={DELEGATE_PORTIONS.EQUAL}
                    label={
                      <Text fw={500} size='sm'>
                        بالتساوي
                      </Text>
                    }
                    size='sm'
                    disabled={isDisabled}
                  />
                  <Radio
                    value={DELEGATE_PORTIONS.MANUAL}
                    label={
                      <Text fw={500} size='sm'>
                        تحديد يدوي
                      </Text>
                    }
                    size='sm'
                    disabled={isDisabled}
                  />
                </Group>
                {form.errors.delegatesPortions && (
                  <Text c='red' size='xs'>
                    {form.errors.delegates_portions}
                  </Text>
                )}
              </Radio.Group>
            </Stack>
            {form.values.delegates_portions === DELEGATE_PORTIONS.EQUAL && (
              <NumberInput
                label={
                  <Text fz={16} fw={500}>
                    حصة كل مندوب:
                  </Text>
                }
                w='100%'
                placeholder='1'
                size='sm'
                min={1}
                allowDecimal={false}
                classNames={{
                  input: 'placeholder:!text-sm !text-primary !font-normal',
                }}
                leftSection={<Divide size={16} />}
                disabled={isDisabled}
                {...form.getInputProps('delegate_single_portion')}
                value={form.values.delegate_single_portion as number}
                onChange={(value) => {
                  if (!isDisabled) {
                    form.setFieldValue('delegate_single_portion', value as number);
                    setQuery({ delegateSinglePortion: value as number });
                  }
                }}
              />
            )}
          </>
        )}
      </SimpleGrid>
      <Stack
        align='flex-start'
        mt={20}
        gap={0}
        hidden={isDisabled && !(initialData?.additional_notes as string)}
      >
        <Text fz={16} fw={500}>
          الملحقات :
        </Text>
        <Textarea
          w='100%'
          flex={1}
          size='sm'
          placeholder='أدخل التفاصيل...'
          classNames={{
            input: 'placeholder:!text-sm !text-primary !font-normal',
          }}
          minRows={3}
          maxRows={6}
          autosize
          disabled={isDisabled}
          {...form.getInputProps('additional_notes')}
        />
      </Stack>
    </form>
  );
}
