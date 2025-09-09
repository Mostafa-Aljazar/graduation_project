import { Stack } from '@mantine/core';
import Security_Tasks_Header_Tabs from '@/components/actors/security/tasks/security-tasks-tabs';
import Security_Tasks_Content from '@/components/actors/security/tasks/security-tasks-content';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { FAVICON } from '@/assets/common';
import { getSecurityTasks } from '@/actions/actors/security/tasks/getSecurityTasks';
import { TASKS_TABS } from '@/@types/actors/common-types/index.type';
import { SECURITY_ROUTES_fUNC } from '@/constants/routes';

const FALLBACK = {
  TITLE: 'مهام الحراس | AL-AQSA Camp',
  DESCRIPTION: 'عرض جميع المهام الخاصة بالحراس على منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ security: string }>;
  searchParams: Promise<{ 'tasks-tab'?: TASKS_TABS }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { security } = await params;
  const securityId = Number(security);

  const { 'tasks-tab': tabParam } = await searchParams;
  const tab = tabParam || TASKS_TABS.COMPLETED_TASKS;

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const response = await getSecurityTasks({
      security_Id: securityId,
      task_type: tab,
      page: 1,
      limit: 1,
    });

    const totalTasks = response?.pagination?.total_items || 0;
    const title = `مهام الحارس (${totalTasks}) | AL-AQSA Camp` || FALLBACK.TITLE;
    const description =
      `عدد المهام الخاصة بالحارس: ${totalTasks}. تصفح جميع المهام على منصة مخيم الأقصى.` ||
      FALLBACK.DESCRIPTION;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'website',
        url: APP_URL + SECURITY_ROUTES_fUNC({ security_Id: securityId }).TASKS,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Security Tasks' },
          ...previousImages,
        ],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [FALLBACK.IMAGE],
      },
    };
  } catch {
    return {
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title: FALLBACK.TITLE,
        description: FALLBACK.DESCRIPTION,
        type: 'website',
        url: APP_URL + SECURITY_ROUTES_fUNC({ security_Id: securityId }).TASKS,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Security Tasks' },
          ...previousImages,
        ],
        locale: 'ar',
      },
      twitter: {
        card: 'summary_large_image',
        title: FALLBACK.TITLE,
        description: FALLBACK.DESCRIPTION,
        images: [FALLBACK.IMAGE],
      },
    };
  }
}

export default async function Security_Tasks({ params }: Props) {
  const { security } = await params;
  const securityId = Number(security);

  return (
    <Stack justify={'center'} align={'center'} pt={20} w={'100%'} px={10}>
      <Security_Tasks_Header_Tabs />

      <Security_Tasks_Content security_Id={securityId} />
    </Stack>
  );
}
