'use client';

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
  CheckSquare,
  TableOfContents,
  Tag,
  ListCheck,
} from 'lucide-react';
import {
  DISTRIBUTION_MECHANISM,
  TYPE_AIDS_LABELS,
  DISTRIBUTION_METHOD,
} from '@/content/actor/manager/aids-management';

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

const DetailItem = ({
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
          <DetailItem
            label='اسم المساعدة:'
            value={aid_Data.aid_name}
            icon={<Tag size={14} />}
          />
          <DetailItem
            label='النوع:'
            value={TYPE_AIDS_LABELS[aid_Data.aid_type]}
            icon={<Package size={16} />}
          />
        </SimpleGrid>
        <Box p={20} className='!bg-[#f1f1f1]/30 !rounded-md'>
          <DetailItem
            label='المحتوى:'
            value={aid_Data.aid_content}
            icon={<TableOfContents size={14} />}
          />
        </Box>
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          p={20}
          className='!bg-[#f1f1f1]/30 !rounded-md'
        >
          <DetailItem
            label='موعد التسليم :'
            value={formatDate(aid_Data.delivery_date)}
            icon={<Calendar size={16} />}
          />
          <DetailItem
            label='مكان التسليم :'
            value={aid_Data.delivery_location}
            icon={<MapPin size={16} />}
          />
        </SimpleGrid>
        {/* <DetailItem
          label='يلزم تأمين المساعدة :'
          value={aid_Data.securityRequired ? 'نعم' : 'لا'}
          icon={<Shield size={16} />}
        /> */}
        {/* <SimpleGrid
          cols={{ base: 1, md: 2 }}
          p={20}
          className='!bg-[#f1f1f1]/30 !rounded-md'
        >
          <DetailItem
            label='كمية المساعدات المتوفرة :'
            value={
              aid_Data.quantityAvailability === QUANTITY_AVAILABILITY.limited
                ? 'كمية محدودة'
                : 'كمية غير محدودة'
            }
            icon={<Gauge size={16} />}
          />
          <DetailItem
            label='كمية المساعدات الحالية :'
            value={`${aid_Data.existingQuantity} وحدة`}
            icon={<Boxes size={16} />}
          />
        </SimpleGrid> */}
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          p={20}
          className='!bg-[#f1f1f1]/30 !rounded-md'
        >
          <DetailItem
            label='حصة العائلة :'
            value={aid_Data.single_portion}
            icon={<Divide size={16} />}
          />

          <DetailItem
            label='طريقة التوزيع:'
            value={
              aid_Data.distribution_method == DISTRIBUTION_METHOD.equal
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
                <Text fw={600} fz={16} className='text-gray-800'>
                  فئات العائلات:
                </Text>
              </Group>

              <Stack gap='sm'>
                {aid_Data.selected_categories.map((cat) => (
                  <Box
                    key={cat.id}
                    className='bg-white shadow-sm p-4 border border-gray-100 rounded-lg'
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
          <DetailItem
            label='آلية التوزيع:'
            value={
              aid_Data.distribution_mechanism ==
              DISTRIBUTION_MECHANISM.delegates_lists
                ? 'حسب كشوفات المناديب'
                : 'حسب كشوفات النازحين'
            }
            icon={<ListCheck size={16} />}
          />
        </Box>

        {/* {aid_Data.distributionMechanism ===
          DISTRIBUTION_MECHANISM.delegates_lists && (
          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            p={20}
            className='!bg-[#f1f1f1]/30 !rounded-md'
          >
            <Box
              className={
                aid_Data.delegatesPortions === DELEGATE_PORTIONS.manual
                  ? 'md:col-span-2'
                  : ''
              }
            >
              <DetailItem
                label='حصص المناديب:'
                value={
                  aid_Data.delegatesPortions === DELEGATE_PORTIONS.equal
                    ? 'حصص متساوية'
                    : 'حصص مختلفة'
                }
                icon={<Users size={16} />}
              />
            </Box>

            {aid_Data.delegatesPortions === DELEGATE_PORTIONS.equal && (
              <DetailItem
                label='حصة كل مندوب:'
                value={aid_Data.delegateSinglePortion}
                icon={<Divide size={16} />}
              />
            )}
          </SimpleGrid>
        )} */}

        {aid_Data.aid_accessories && (
          <Box p={20} className='!bg-[#f1f1f1]/30 !rounded-md'>
            <DetailItem
              label='الملحقات:'
              value={aid_Data.aid_accessories}
              icon={<ListCheck size={16} />}
            />
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

{
  /* {aid_Data.distributionMechanism ===
          DISTRIBUTION_MECHANISM.delegates_lists && (
          <Stack gap='sm'>
            

            {isAid(aid_Data) &&
              aid_Data.selectedDelegatesPortions.length > 0 && (
                <Stack gap='sm'>
                  <Text fw={600} fz={16} className='text-gray-800'>
                    تفاصيل المناديب:
                  </Text>
                  <List
                    spacing='xs'
                    size='sm'
                    icon={
                      <ThemeIcon size={16} radius='xl' color='primary'>
                        <Users size={12} />
                      </ThemeIcon>
                    }
                  >
                    {aid_Data.selectedDelegatesPortions.map((p) => (
                      <List.Item key={p.delegate_id}>
                        مندوب {p.delegate_id}: {p.portion}
                      </List.Item>
                    ))}
                  </List>
                </Stack>
              )}
          </Stack>
        )} 

        {isAid(aid_Data) && aid_Data.selectedDisplacedIds.length > 0 && (
          <Stack gap='sm'>
            <Text fw={600} fz={16} className='text-gray-800'>
              النازحين المحددين:
            </Text>
            <List
              spacing='xs'
              size='sm'
              icon={
                <ThemeIcon size={16} radius='xl' color='primary'>
                  <Users size={12} />
                </ThemeIcon>
              }
            >
              {aid_Data.selectedDisplacedIds.map((id) => (
                <List.Item key={id}>نازح {id}</List.Item>
              ))}
            </List>
          </Stack>
        )}
        {isAid(aid_Data) && aid_Data.receivedDisplaced.length > 0 && (
          <Stack gap='sm'>
            <Text fw={600} fz={16} className='text-gray-800'>
              النازحين المستلمين:
            </Text>
            <List
              spacing='xs'
              size='sm'
              icon={
                <ThemeIcon size={16} radius='xl' color='green'>
                  <CheckSquare size={12} />
                </ThemeIcon>
              }
            >
              {aid_Data.receivedDisplaced.map((d) => (
                <List.Item key={d.displaced_ID}>
                  نازح {d.displaced_ID} - استلم في: {formatDate(d.receivedTime)}
                </List.Item>
              ))}
            </List>
          </Stack>
        )}
          */
}
