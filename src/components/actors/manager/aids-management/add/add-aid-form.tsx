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
import { useForm, zodResolver } from '@mantine/form';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import {
  addAidFormSchema,
  addAidFormValues,
} from '@/validation/manager/add-aid-form-schema';
import {
  AddAidPayload,
  AidResponse,
  CategoryRangeType,
} from '@/@types/actors/manager/aid-management/add-aid-management.types';
import {
  DELEGATE_PORTIONS,
  DISTRIBUTION_MECHANISM,
  DISTRIBUTION_METHOD,
  GET_AIDS_TYPE_ICONS,
  QUANTITY_AVAILABILITY,
  TYPE_AIDS,
} from '@/content/actor/manager/aids-management';
import CustomizableCategoryInput from './distribution-methods/customizable-category-input';
import PortionsManagementModal from './distribution-methods/portions-management-modal';

interface AddFormProps {
  onSubmit: (values: addAidFormValues) => void;
  initialData?: AddAidPayload;
  isDisabled?: boolean;
}

export default function Add_Aid_Form({
  onSubmit,
  initialData,
  isDisabled = false,
}: AddFormProps) {
  const [query, setQuery] = useQueryStates({
    existingQuantity: parseAsInteger.withDefault(
      initialData?.existingQuantity || 0
    ),
    distributionMechanism: parseAsStringEnum<DISTRIBUTION_MECHANISM>(
      Object.values(DISTRIBUTION_MECHANISM)
    ).withDefault(
      initialData?.distributionMechanism ||
        DISTRIBUTION_MECHANISM.delegates_lists
    ),
    delegatesPortions: parseAsStringEnum<DELEGATE_PORTIONS>(
      Object.values(DELEGATE_PORTIONS)
    ).withDefault(initialData?.delegatesPortions || DELEGATE_PORTIONS.equal),
    quantityAvailability: parseAsStringEnum<QUANTITY_AVAILABILITY>(
      Object.values(QUANTITY_AVAILABILITY)
    ).withDefault(
      initialData?.quantityAvailability || QUANTITY_AVAILABILITY.limited
    ),
    distributionMethod: parseAsStringEnum<DISTRIBUTION_METHOD>(
      Object.values(DISTRIBUTION_METHOD)
    ).withDefault(initialData?.distributionMethod || DISTRIBUTION_METHOD.equal),
    delegateSinglePortion: parseAsInteger.withDefault(
      initialData?.delegateSinglePortion || 0
    ),
  });

  const [categoryPortions, setCategoryPortions] = useState<
    Record<string, number>
  >(
    initialData?.selectedCategories.reduce(
      (acc, cat) => ({ ...acc, [cat.id]: cat.portion || 1 }),
      {}
    ) || {}
  );

  const form = useForm<addAidFormValues>({
    initialValues: initialData || {
      aidName: '',
      aidType: '',
      aidContent: '',
      deliveryDate: new Date('2025-06-15T00:00:00'),
      deliveryLocation: '',
      securityRequired: false,
      quantityAvailability: query.quantityAvailability,
      existingQuantity: query.existingQuantity || 1,
      singlePortion: 1,
      distributionMethod: query.distributionMethod,
      selectedCategories: [],
      distributionMechanism: query.distributionMechanism,
      delegatesPortions: query.delegatesPortions,
      delegateSinglePortion: query.delegateSinglePortion || 1,
      aidAccessories: '',
      // receivedDisplaced: [],
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
      const updatedCategories = form.values.selectedCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, portion } : cat
      );
      form.setFieldValue('selectedCategories', updatedCategories);
    },
    [form, isDisabled]
  );

  const handleCategoryAdd = (categoryId: string, portion: number) => {
    if (isDisabled) return;
    setCategoryPortions((prev) => ({ ...prev, [categoryId]: portion }));
  };

  const synchronizePortions = (cats: CategoryRangeType[]) => {
    if (
      form.values.distributionMethod === DISTRIBUTION_METHOD.equal &&
      cats.length > 0 &&
      !isDisabled
    ) {
      const updatedCategories = cats.map((cat) => ({
        ...cat,
        portion: form.values.singlePortion,
      }));

      const hasChanges = updatedCategories.some(
        (cat, index) =>
          cat.portion !== (form.values.selectedCategories[index]?.portion ?? 1)
      );

      if (hasChanges) {
        form.setFieldValue('selectedCategories', updatedCategories);
        updatedCategories.forEach((cat) => {
          setCategoryPortions((prev) => ({
            ...prev,
            [cat.id]: form.values.singlePortion,
          }));
        });
      }
    }
  };

  useEffect(() => {
    synchronizePortions(form.values.selectedCategories);
  }, [form.values.distributionMethod, form.values.singlePortion]);

  const calculateTotalAid = () => {
    if (form.values.selectedCategories.length === 0) return null;

    if (form.values.distributionMethod === DISTRIBUTION_METHOD.equal) {
      return form.values.singlePortion * form.values.selectedCategories.length;
    } else {
      return form.values.selectedCategories.reduce(
        (total, category) =>
          total + (categoryPortions[category.id] ?? category.portion ?? 1),
        0
      );
    }
  };

  const handleSubmit = (values: addAidFormValues) => {
    if (isDisabled) return;
    onSubmit(values);
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
          size='sm'
          leftSection={<Tag size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('aidName')}
        />

        <Select
          label={
            <Text fz={16} fw={500}>
              نوع المساعدة:
            </Text>
          }
          w='100%'
          placeholder='نوع المساعدة'
          data={Object.entries(TYPE_AIDS).map(([key, value]) => ({
            value: value,
            label: value,
          }))}
          size='sm'
          classNames={{
            input: 'placeholder:text-sm text-primary font-medium',
          }}
          clearable
          leftSection={<Package size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('aidType')}
          renderOption={({ option, checked }) => {
            const Icon = GET_AIDS_TYPE_ICONS[option.value as TYPE_AIDS];
            return (
              <Group gap='xs' wrap='nowrap'>
                {Icon && <Icon size={16} />}
                <Text size='sm'>{option.label}</Text>
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
          size='sm'
          leftSection={<TableOfContents size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('aidContent')}
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
            input: 'placeholder:text-sm text-primary font-medium',
          }}
          value={form.values.deliveryDate}
          onChange={(date) =>
            !isDisabled && form.setFieldValue('deliveryDate', new Date(date))
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
            input: 'placeholder:text-sm text-primary font-medium',
          }}
          leftSection={<MapPin size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('deliveryLocation')}
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
            value={form.values.securityRequired.toString()}
            onChange={(value) =>
              !isDisabled &&
              form.setFieldValue('securityRequired', value === 'true')
            }
            // disabled={isDisabled}
          >
            <Group
              w={{ base: '100%', md: '60%' }}
              gap={30}
              wrap='nowrap'
              align='center'
            >
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
            {form.errors.securityRequired && (
              <Text c='red' size='xs'>
                {form.errors.securityRequired}
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
            value={form.values.quantityAvailability}
            onChange={(value) => {
              if (!isDisabled) {
                form.setFieldValue(
                  'quantityAvailability',
                  value as QUANTITY_AVAILABILITY
                );
                setQuery({
                  quantityAvailability: value as QUANTITY_AVAILABILITY,
                });
              }
            }}
            // disabled={isDisabled}
          >
            <Group
              w={{ base: '100%', md: '60%' }}
              gap={30}
              wrap='nowrap'
              align='center'
            >
              <Radio
                value={QUANTITY_AVAILABILITY.limited}
                label={
                  <Text fz={15} fw={500}>
                    محدود
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
              <Radio
                value={QUANTITY_AVAILABILITY.unlimited}
                label={
                  <Text fz={15} fw={500}>
                    غير محدود
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
            </Group>
            {form.errors.quantityAvailability && (
              <Text c='red' size='xs'>
                {form.errors.quantityAvailability}
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
            input: 'placeholder:text-sm text-primary font-medium',
          }}
          leftSection={<Boxes size={16} />}
          value={form.values.existingQuantity}
          onChange={(value) => {
            if (!isDisabled) {
              form.setFieldValue('existingQuantity', Number(value));
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
            input: 'placeholder:text-sm text-primary font-medium',
          }}
          leftSection={<Divide size={16} />}
          disabled={isDisabled}
          {...form.getInputProps('singlePortion')}
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
            value={form.values.distributionMethod}
            onChange={(value) =>
              !isDisabled &&
              form.setFieldValue(
                'distributionMethod',
                value as DISTRIBUTION_METHOD
              )
            }
            // disabled={isDisabled}
          >
            <Group
              w={{ base: '100%', md: '60%' }}
              gap={30}
              wrap='nowrap'
              align='center'
            >
              <Radio
                value={DISTRIBUTION_METHOD.equal}
                label={
                  <Text fz={15} fw={500}>
                    بالتساوي
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
              <Radio
                value={DISTRIBUTION_METHOD.family_number}
                label={
                  <Text fz={15} fw={500} className='!text-nowrap'>
                    حسب عدد الأفراد
                  </Text>
                }
                size='sm'
                disabled={isDisabled}
              />
            </Group>
            {form.errors.distributionMethod && (
              <Text c='red' size='xs'>
                {form.errors.distributionMethod}
              </Text>
            )}
          </Radio.Group>
        </Stack>
        {form.values.distributionMethod === DISTRIBUTION_METHOD.equal && (
          <Stack gap={0} style={{ gridColumn: '1 / -1' }}>
            <CustomizableCategoryInput
              value={form.values.selectedCategories}
              onChange={(value) => {
                if (!isDisabled) {
                  form.setFieldValue('selectedCategories', value);
                  synchronizePortions(value);
                }
              }}
              label='فئات عدد أفراد العائلة:'
              placeholder='اختر فئة أو أكثر من فئات عدد الأفراد'
              singlePortion={form.values.singlePortion}
              onPortionChange={handlePortionChange}
              onCategoryAdd={handleCategoryAdd}
              isDisabled={isDisabled}
            />
            {form.errors.selectedCategories && (
              <Text c='red' size='xs'>
                {form.errors.selectedCategories}
              </Text>
            )}
          </Stack>
        )}
        {form.values.distributionMethod ===
          DISTRIBUTION_METHOD.family_number && (
          <Stack gap={0} style={{ gridColumn: '1 / -1' }}>
            <PortionsManagementModal
              selectedCategories={form.values.selectedCategories}
              onCategoriesChange={(value) =>
                !isDisabled && form.setFieldValue('selectedCategories', value)
              }
              onPortionChange={handlePortionChange}
              categoryPortions={categoryPortions}
              onCategoryAdd={handleCategoryAdd}
              isDisabled={isDisabled}
            />
            {form.errors.selectedCategories && (
              <Text c='red' size='xs'>
                {form.errors.selectedCategories}
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
            value={form.values.distributionMechanism}
            onChange={(value) => {
              if (!isDisabled) {
                form.setFieldValue(
                  'distributionMechanism',
                  value as DISTRIBUTION_MECHANISM
                );
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
                value={DISTRIBUTION_MECHANISM.delegates_lists}
                label={
                  <Text fz={15} fw={500} className='text-nowrap'>
                    بناءً على كشوفات المناديب
                  </Text>
                }
                size='xs'
                disabled={isDisabled}
              />
              <Radio
                value={DISTRIBUTION_MECHANISM.displaced_families}
                label={
                  <Text fz={15} fw={500} className='text-nowrap'>
                    بناءً على العائلات النازحة
                  </Text>
                }
                size='xs'
                disabled={isDisabled}
              />
            </Flex>
            {form.errors.distributionMechanism && (
              <Text c='red' size='xs'>
                {form.errors.distributionMechanism}
              </Text>
            )}
          </Radio.Group>
        </Stack>
        {form.values.distributionMechanism ===
          DISTRIBUTION_MECHANISM.delegates_lists && (
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
                value={form.values.delegatesPortions}
                onChange={(value) => {
                  if (!isDisabled) {
                    form.setFieldValue(
                      'delegatesPortions',
                      value as DELEGATE_PORTIONS
                    );
                    setQuery({ delegatesPortions: value as DELEGATE_PORTIONS });
                  }
                }}
                // disabled={isDisabled}
              >
                <Group
                  w={{ base: '100%', md: '60%' }}
                  gap={30}
                  wrap='nowrap'
                  align='center'
                >
                  <Radio
                    value={DELEGATE_PORTIONS.equal}
                    label={
                      <Text fw={500} size='sm'>
                        بالتساوي
                      </Text>
                    }
                    size='sm'
                    disabled={isDisabled}
                  />
                  <Radio
                    value={DELEGATE_PORTIONS.manual}
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
                    {form.errors.delegatesPortions}
                  </Text>
                )}
              </Radio.Group>
            </Stack>
            {form.values.delegatesPortions === DELEGATE_PORTIONS.equal && (
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
                  input: 'placeholder:text-sm text-primary font-medium',
                }}
                leftSection={<Divide size={16} />}
                disabled={isDisabled}
                {...form.getInputProps('delegateSinglePortion')}
                value={form.values.delegateSinglePortion as number}
                onChange={(value) => {
                  if (!isDisabled) {
                    form.setFieldValue(
                      'delegateSinglePortion',
                      value as number
                    );
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
        hidden={isDisabled && !(initialData?.aidAccessories as string)}
      >
        <Text fz={16} fw={500}>
          الملحقات :
        </Text>
        <Textarea
          w='100%'
          flex={1}
          size='sm'
          placeholder='أدخل التفاصيل...'
          minRows={3}
          maxRows={6}
          autosize
          disabled={isDisabled}
          {...form.getInputProps('aidAccessories')}
        />
      </Stack>
    </form>
  );
}
