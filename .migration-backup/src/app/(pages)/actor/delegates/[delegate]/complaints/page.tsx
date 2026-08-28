import type { Metadata, ResolvingMetadata } from 'next';
import { getCommonComplaints } from '@/actions/actors/general/complaints/getCommonComplaints';
import { USER_RANK } from '@/constants/userTypes';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/@types/actors/common-types/index.type';
import { APP_URL } from '@/constants/services';
import { DELEGATE_ROUTES_fUNC } from '@/constants/routes';
import { FAVICON } from '@/assets/common';
import { Stack } from '@mantine/core';
import { Suspense } from 'react';
import Common_Complaints_Header_Tabs from '@/components/actors/general/complaints/common-complaints-tabs';
import Common_Complaints_Content from '@/components/actors/general/complaints/common-complaints-content';

const FALLBACK = {
  TITLE: 'شكاوى المندوب | AL-AQSA Camp',
  DESCRIPTION: 'عرض جميع الشكاوى المرسلة والمستقبلة الخاصة بالمندوبين في منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ delegate: string }>;
  searchParams: Promise<{ 'complaints-tab'?: COMPLAINTS_TABS }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { delegate } = await params;
  const { 'complaints-tab': tabParam } = await searchParams;
  const delegateId = Number(delegate);
  const tab = tabParam || COMPLAINTS_TABS.SENT_COMPLAINTS;

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const response = await getCommonComplaints({
      actor_Id: delegateId,
      role: USER_RANK.DELEGATE,
      complaint_type: tab,
      page: 1,
      limit: 1,
      status: COMPLAINTS_STATUS.ALL,
      date_range: [null, null],
      search: '',
    });

    const totalComplaints = response?.pagination?.total_items || 0;

    const title = `شكاوى المندوب (${totalComplaints}) | AL-AQSA Camp` || FALLBACK.TITLE;
    const description =
      `عدد الشكاوى الخاصة بالمندوب: ${totalComplaints}. تصفح جميع الشكاوى في منصة مخيم الأقصى.` ||
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
        url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId }).COMPLAINTS,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Delegate Complaints' },
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
        url: APP_URL + DELEGATE_ROUTES_fUNC({ delegate_Id: delegateId }).COMPLAINTS,
        images: [
          { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Delegate Complaints' },
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

export default async function DelegateComplaints({ params }: Props) {
  const { delegate } = await params;
  const delegateId = Number(delegate);

  return (
    <Stack justify='center' align='center' pt={20} w='100%' px={10}>
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Common_Complaints_Header_Tabs />
      </Suspense>

      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <Common_Complaints_Content actor_Id={delegateId} rank={USER_RANK.DELEGATE} />
      </Suspense>
    </Stack>
  );
}
