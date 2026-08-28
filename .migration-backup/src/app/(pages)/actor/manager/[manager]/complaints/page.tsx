import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';
import { USER_RANK } from '@/constants/userTypes';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { APP_URL } from '@/constants/services';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { getCommonComplaints } from '@/actions/actors/general/complaints/getCommonComplaints';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';

const FALLBACK = {
  TITLE: 'شكاوى المديرين | AL-AQSA Camp',
  DESCRIPTION: 'عرض جميع الشكاوى المرسلة والمستقبلة الخاصة بالمديرين في منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ manager: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { manager } = await params;
  const managerId = Number(manager);
  const tab = COMPLAINTS_TABS.RECEIVED_COMPLAINTS;

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const response = await getCommonComplaints({
      actor_Id: managerId,
      role: USER_RANK.MANAGER,
      complaint_type: tab,
      page: 1,
      limit: 1,
      status: COMPLAINTS_STATUS.ALL,
      date_range: [null, null],
      search: '',
    });

    const totalComplaints = response?.pagination?.total_items || 0;

    const title =
      response.status == 200 ? `شكاوى المدير (${totalComplaints}) | AL-AQSA Camp` : FALLBACK.TITLE;
    const description =
      response.status == 200
        ? `عدد الشكاوى الخاصة بالمدير: ${totalComplaints}. تصفح جميع الشكاوى المرسلة والمستقبلة في منصة مخيم الأقصى.`
        : FALLBACK.DESCRIPTION;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'website',
        url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId }).COMPLAINTS,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Manager Complaints' },
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
        url: APP_URL + MANAGER_ROUTES_fUNC({ manager_Id: managerId }).COMPLAINTS,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Manager Complaints' },
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

export default async function ManagerComplaints({ params }: Props) {
  const { manager } = await params;
  const managerId = Number(manager);

  return (
    <Stack justify='center' align='center' pt={20} w='100%' px={10}>
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Common_Complaints_Content actor_Id={managerId} rank={USER_RANK.MANAGER} />
      </Suspense>
    </Stack>
  );
}
