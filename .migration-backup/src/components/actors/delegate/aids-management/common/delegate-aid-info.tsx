'use client';

import {
  DELEGATE_PORTIONS,
  DISTRIBUTION_MECHANISM,
  DISTRIBUTION_METHOD,
  QUANTITY_AVAILABILITY,
  TYPE_AIDS_LABELS,
} from '@/@types/actors/common-types/index.type';
import { Aid } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import {
  Stack,
  Group,
  Divider,
  Text,
  ThemeIcon,
  Badge,
  SimpleGrid,
  Box,
} from '@mantine/core';
import {
  Package,
  Calendar,
  MapPin,
  Gauge,
  Users,
  Divide,
  TableOfContents,
  Tag,
  ListCheck,
  Shield,
  Boxes,
} from 'lucide-react';

const formatDate = (date: Date | null) =>
  date
    ? new Date(date).toLocaleString('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'غير محدد';

const Detail_Item = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <Stack gap={12}>
    <Group gap='xs' align='center'>
      <ThemeIcon size={25} radius='xl' color='primary'>
        {icon}
      </ThemeIcon>
      <Text fw={500} fz={16} className='text-gray-700'>
        {label}
      </Text>
    </Group>
    <Text
      p={5}
      fz={14}
      className='!bg-white !border-[1px] !border-gray-100 !rounded-md font-normal'
    >
      {value}
    </Text>
  </Stack>
);

interface DelegateAidInfoProps {
  aid_Data: Aid;
}

export default function Delegate_Aid_Info({ aid_Data }: DelegateAidInfoProps) {
  return (
    <Stack>
      <Group align='center' gap={5}>
        <ThemeIcon size={25} radius='xl' color='white'>
          <Package size={18} className='text-primary' />
        </ThemeIcon>
        <Text fz={{ base: 16, md: 18 }} fw={600} className='!text-primary'>
          تفاصيل المساعدة :
        </Text>
        <Badge
          color={aid_Data.is_completed ? 'green' : 'yellow'}
          size='lg'
          variant='filled'
          className='w-fit'
        >
          الحالة : {aid_Data.is_completed ? 'مكتمل' : 'قيد التنفيذ'}
        </Badge>
      </Group>

      <Divider h={1} className='!bg-primary' />

      <Stack>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          verticalSpacing={20}
          p={20}
          className='!bg-[#f1f1f1]/30 !rounded-md'
        >
          <Detail_Item
            label='اسم المساعدة:'
            value={aid_Data.aid_name}
            icon={<Tag size={14} />}
          />
          <Detail_Item
            label='النوع:'
            value={TYPE_AIDS_LABELS[aid_Data.aid_type]}
            icon={<Package size={16} />}
          />

          <Box className='md:col-span-2'>
            <Detail_Item
              label='المحتوى:'
              value={aid_Data.aid_content}
              // value={
              //   'Dolore reprehenderit minim deserunt sunt Lorem laboris exercitation nisi qui ad. Eiusmod sint incididunt tempor incididunt dolore nostrud laboris do consequat ullamco. Enim labore esse in do. Ullamco anim veniam nisi voluptate labore mollit tempor deserunt irure. Fugiat laboris ad occaecat non fugiat proident nulla ipsum elit.'
              // }
              icon={<TableOfContents size={14} />}
            />
          </Box>
        </SimpleGrid>

        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          p={20}
          className='!bg-[#f1f1f1]/30 !rounded-md'
        >
          <Detail_Item
            label='موعد التسليم :'
            value={formatDate(aid_Data.delivery_date)}
            icon={<Calendar size={16} />}
          />
          <Detail_Item
            label='مكان التسليم :'
            value={aid_Data.delivery_location}
            icon={<MapPin size={16} />}
          />
        </SimpleGrid>

        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          p={20}
          className='!bg-[#f1f1f1]/30 !rounded-md'
        >
          <Detail_Item
            label='كمية المساعدات المتوفرة :'
            value={
              aid_Data.quantity_availability === QUANTITY_AVAILABILITY.LIMITED
                ? 'كمية محدودة'
                : 'كمية غير محدودة'
            }
            icon={<Gauge size={16} />}
          />
          <Detail_Item
            label='كمية المساعدات الحالية :'
            value={`${aid_Data.existing_quantity} وحدة`}
            icon={<Boxes size={16} />}
          />

          <Detail_Item
            label='يلزم تأمين المساعدة :'
            value={aid_Data.security_required ? 'نعم' : 'لا'}
            icon={<Shield size={16} />}
          />
        </SimpleGrid>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          p={20}
          className='!bg-[#f1f1f1]/30 !rounded-md'
        >
          <Detail_Item
            label='حصة العائلة الواحدة :'
            value={aid_Data.displaced_single_portion}
            icon={<Divide size={16} />}
          />

          <Detail_Item
            label='طريقة التوزيع:'
            value={
              aid_Data.distribution_method == DISTRIBUTION_METHOD.EQUAL
                ? ' التوزيع بالتساوي على العائلات'
                : 'التوزيع حسب عدد أفراد العائلة'
            }
            icon={<Users size={16} />}
          />
        </SimpleGrid>

        {aid_Data.selected_categories.length > 0 && (
          <Box p={20} className='!bg-[#f1f1f1]/30 !rounded-md'>
            <Stack gap='md'>
              <Group gap='xs' align='center'>
                <ThemeIcon size={25} radius='xl' color='primary'>
                  <Users size={16} />
                </ThemeIcon>
                <Text fw={500} fz={16} className='text-gray-800'>
                  فئات العائلات:
                </Text>
              </Group>

              <Stack gap='sm'>
                {aid_Data.selected_categories.map((cat) => (
                  <Box
                    key={cat.id}
                    className='bg-white p-4 border border-gray-100 rounded-lg'
                  >
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='lg'>
                      <Group gap='xs'>
                        <ThemeIcon size={18} radius='xl' color='primary'>
                          <Tag size={14} />
                        </ThemeIcon>
                        <Text fz={14} className='text-gray-800'>
                          {cat.label}
                        </Text>
                      </Group>

                      <Group gap='xs'>
                        <ThemeIcon size={18} radius='xl' color='primary'>
                          <Gauge size={14} />
                        </ThemeIcon>
                        <Text fz={14} className='text-gray-800'>
                          من {cat.min} {cat.max ? `إلى ${cat.max}` : 'فأكثر'}
                        </Text>
                      </Group>

                      <Group gap='xs'>
                        <ThemeIcon size={18} radius='xl' color='primary'>
                          <Divide size={14} />
                        </ThemeIcon>
                        <Text fz={14} className='text-gray-800'>
                          الحصة: {cat.portion}
                        </Text>
                      </Group>
                    </SimpleGrid>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        )}

        <Box p={20} className='!bg-[#f1f1f1]/30 !rounded-md'>
          <Detail_Item
            label='آلية التوزيع:'
            value={
              aid_Data.distribution_mechanism ==
              DISTRIBUTION_MECHANISM.DELEGATES_LISTS
                ? 'حسب كشوفات المناديب'
                : 'حسب كشوفات النازحين'
            }
            icon={<ListCheck size={16} />}
          />
        </Box>

        {aid_Data.distribution_mechanism ===
          DISTRIBUTION_MECHANISM.DELEGATES_LISTS && (
          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            p={20}
            className='!bg-[#f1f1f1]/30 !rounded-md'
          >
            <Box
              className={
                aid_Data.delegates_portions === DELEGATE_PORTIONS.MANUAL
                  ? 'md:col-span-2'
                  : ''
              }
            >
              <Detail_Item
                label='حصص المناديب:'
                value={
                  aid_Data.delegates_portions === DELEGATE_PORTIONS.EQUAL
                    ? 'حصص متساوية'
                    : 'حصص مختلفة'
                }
                icon={<Users size={16} />}
              />
            </Box>

            {aid_Data.delegates_portions === DELEGATE_PORTIONS.EQUAL && (
              <Detail_Item
                label='حصة كل مندوب:'
                value={aid_Data.delegate_single_portion as number}
                icon={<Divide size={16} />}
              />
            )}
          </SimpleGrid>
        )}

        {aid_Data.additional_notes && (
          <Box p={20} className='!bg-[#f1f1f1]/30 !rounded-md'>
            <Detail_Item
              label='الملحقات:'
              value={aid_Data.additional_notes}
              icon={<ListCheck size={16} />}
            />
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
