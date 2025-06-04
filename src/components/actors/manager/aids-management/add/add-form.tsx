'use client';

import {
  Group,
  NumberInput,
  Radio,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Stack,
  Button,
  Textarea,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import {
  Calendar,
  MapPin,
  Package,
  CheckSquare,
  RotateCcw,
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
import { useRouter } from 'next/navigation';
import {
  addAidFormSchema,
  addAidFormValues,
} from '@/validation/manager/add-aid-form-schema';
import { CategoryRangeType } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { TYPE_AIDS } from '@/content/actor/manager/aids-management';
import CustomizableCategoryInput from './customizable-category-input';
import PortionsManagementModal from './portions-management-modal';
import { parseAsStringEnum, useQueryState } from 'nuqs';

export enum DISTRIBUTION_MECHANISM {
  delegates_lists = 'delegates_lists',
  displaced_families = 'displaced_families',
}
export default function AddForm() {
  const [dist_Mech, setDist_Mech] = useQueryState(
    'distributionMechanism',
    parseAsStringEnum<DISTRIBUTION_MECHANISM>(
      Object.values(DISTRIBUTION_MECHANISM)
    ).withDefault(DISTRIBUTION_MECHANISM.delegates_lists)
  );

  const router = useRouter();
  const [categoryPortions, setCategoryPortions] = useState<
    Record<string, number>
  >({});

  const form = useForm<addAidFormValues>({
    initialValues: {
      assistanceName: '',
      assistanceType: '',
      assistanceContent: '',
      deliveryDate: new Date(),
      deliveryLocation: '',
      securityRequired: false,
      quantityAvailability: 'limited',
      existingQuantity: 1,
      singlePortion: 1,
      distributionMethod: 'equal',
      selectedCategories: [],
      distributionMechanism: dist_Mech,
    },
    validate: zodResolver(addAidFormSchema),
  });

  const handlePortionChange = useCallback(
    (categoryId: string, portion: number) => {
      setCategoryPortions((prev) => ({
        ...prev,
        [categoryId]: portion,
      }));
      const updatedCategories = form.values.selectedCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, portion } : cat
      );
      form.setFieldValue('selectedCategories', updatedCategories);
    },
    [form]
  );

  const handleCategoryAdd = (categoryId: string, portion: number) => {
    setCategoryPortions((prev) => ({ ...prev, [categoryId]: portion }));
  };

  const synchronizePortions = (cats: CategoryRangeType[]) => {
    if (form.values.distributionMethod === 'equal' && cats.length > 0) {
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

    if (form.values.distributionMethod === 'equal') {
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
    console.log('🚀 ~ handleSubmit ~ values:', values);
  };

  const handleReset = () => {
    form.reset();
    setCategoryPortions({});
    setDist_Mech(DISTRIBUTION_MECHANISM.delegates_lists);
    // router.push('/');
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
        <Group wrap='nowrap'>
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
            {...form.getInputProps('assistanceName')}
          />
        </Group>

        <Group wrap='nowrap'>
          <Select
            label={
              <Text fz={16} fw={500}>
                نوع المساعدة:
              </Text>
            }
            w='100%'
            placeholder='نوع المساعدة'
            data={Object.entries(TYPE_AIDS).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            size='sm'
            classNames={{
              input: 'placeholder:text-sm text-primary font-normal',
            }}
            clearable
            leftSection={<Package size={16} />}
            {...form.getInputProps('assistanceType')}
          />
        </Group>

        <Group wrap='nowrap'>
          <TextInput
            label={
              <Text fz={16} fw={500}>
                محتوي المساعدة:
              </Text>
            }
            w='100%'
            placeholder='محتوي المساعدة'
            size='sm'
            leftSection={<TableOfContents size={16} />}
            {...form.getInputProps('assistanceContent')}
          />
        </Group>
        <Group wrap='nowrap'>
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
              input: 'placeholder:text-sm text-primary font-normal',
            }}
            // clearable
            value={form.values.deliveryDate}
            onChange={(date) =>
              form.setFieldValue('deliveryDate', new Date(date))
            }
            leftSection={<Calendar size={16} />}
            error={form.errors.deliveryDate}
            valueFormat='DD/MM/YYYY hh:mm A'
          />
        </Group>

        <Group wrap='nowrap'>
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
              input: 'placeholder:text-sm text-primary font-normal',
            }}
            leftSection={<MapPin size={16} />}
            {...form.getInputProps('deliveryLocation')}
          />
        </Group>

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
              form.setFieldValue('securityRequired', value === 'true')
            }
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
                  <Text fw={500} fz={16}>
                    لا
                  </Text>
                }
                size='sm'
              />
              <Radio
                value='true'
                label={
                  <Text fw={500} fz={16}>
                    نعم
                  </Text>
                }
                size='sm'
              />
            </Group>
            {form.errors.securityRequired && (
              <Text c='red' size='xs' mt={4}>
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
          <Radio.Group w='100%' {...form.getInputProps('quantityAvailability')}>
            <Group
              w={{ base: '100%', md: '60%' }}
              gap={30}
              wrap='nowrap'
              align='center'
            >
              <Radio
                value='limited'
                label={
                  <Text fw={500} fz={16}>
                    محدود
                  </Text>
                }
                size='sm'
              />
              <Radio
                value='unlimited'
                label={
                  <Text fw={500} fz={16}>
                    غير محدود
                  </Text>
                }
                size='sm'
              />
            </Group>
            {form.errors.quantityAvailability && (
              <Text c='red' size='xs' mt={4}>
                {form.errors.quantityAvailability}
              </Text>
            )}
          </Radio.Group>
        </Stack>

        <Group wrap='nowrap'>
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
              input: 'placeholder:text-sm text-primary font-normal',
            }}
            leftSection={<Boxes size={16} />}
            {...form.getInputProps('existingQuantity')}
            allowDecimal={false}
          />
        </Group>

        <Group wrap='nowrap'>
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
              input: 'placeholder:text-sm text-primary font-normal',
            }}
            leftSection={<Divide size={16} />}
            {...form.getInputProps('singlePortion')}
            allowDecimal={false}
          />
        </Group>

        <Stack gap='xs'>
          <Group gap={5}>
            <Users size={16} />
            <Text fz={16} fw={500}>
              حصة كل عائلة:
            </Text>
          </Group>

          <Radio.Group w='100%' {...form.getInputProps('distributionMethod')}>
            <Group
              w={{ base: '100%', md: '60%' }}
              gap={30}
              wrap='nowrap'
              align='center'
            >
              <Radio
                value='equal'
                label={
                  <Text fz={16} fw={500}>
                    بالتساوي
                  </Text>
                }
                size='sm'
              />
              <Radio
                value='by_members'
                label={
                  <Text fz={16} fw={500}>
                    حسب عدد الأفراد
                  </Text>
                }
                size='sm'
              />
            </Group>
            {form.errors.distributionMethod && (
              <Text c='red' size='xs' mt={4}>
                {form.errors.distributionMethod}
              </Text>
            )}
          </Radio.Group>
        </Stack>

        {form.values.distributionMethod === 'equal' && (
          <Group wrap='nowrap' style={{ gridColumn: '1 / -1' }}>
            <CustomizableCategoryInput
              value={form.values.selectedCategories}
              onChange={(value) => {
                form.setFieldValue('selectedCategories', value);
                synchronizePortions(value);
              }}
              label='فئات عدد أفراد العائلة:'
              placeholder='اختر فئة أو أكثر من فئات عدد الأفراد'
              singlePortion={form.values.singlePortion}
              onPortionChange={handlePortionChange}
              onCategoryAdd={handleCategoryAdd}
            />
            {form.errors.selectedCategories && (
              <Text c='red' size='xs' mt={4}>
                {form.errors.selectedCategories}
              </Text>
            )}
          </Group>
        )}

        {form.values.distributionMethod === 'by_members' && (
          <Group wrap='nowrap' style={{ gridColumn: '1 / -1' }}>
            <PortionsManagementModal
              selectedCategories={form.values.selectedCategories}
              onCategoriesChange={(value) =>
                form.setFieldValue('selectedCategories', value)
              }
              onPortionChange={handlePortionChange}
              categoryPortions={categoryPortions}
              onCategoryAdd={handleCategoryAdd}
            />
            {form.errors.selectedCategories && (
              <Text c='red' size='xs' mt={4}>
                {form.errors.selectedCategories}
              </Text>
            )}
          </Group>
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
            defaultValue={dist_Mech}
            value={form.values.distributionMechanism}
            onChange={(value) => {
              form.setFieldValue(
                'distributionMechanism',
                value as DISTRIBUTION_MECHANISM
              );
              setDist_Mech(value as DISTRIBUTION_MECHANISM);
            }}
          >
            <Group w={{ base: '100%' }} gap={30} align='center' wrap='nowrap'>
              <Radio
                value='delegates_lists'
                label={
                  <Text fw={500} fz={14} className='text-nowrap'>
                    بناءً على كشوفات المناديب
                  </Text>
                }
                size='xs'
              />
              <Radio
                value='displaced_families'
                label={
                  <Text fw={500} fz={14} className='text-nowrap'>
                    بناءً على العائلات النازحة
                  </Text>
                }
                size='xs'
              />
            </Group>
            {form.errors.distributionMechanism && (
              <Text c='red' size='xs' mt={4}>
                {form.errors.distributionMechanism}
              </Text>
            )}
          </Radio.Group>
        </Stack>
      </SimpleGrid>

      <Group align='flex-start'>
        <Text fw={500} fz={16} className='!text-primary'>
          الملحقات :
        </Text>
        <Textarea
          flex={1}
          size='sm'
          placeholder='أدخل التفاصيل...'
          minRows={2}
          maxRows={6}
          autosize
        />
      </Group>
    </form>
  );
}
