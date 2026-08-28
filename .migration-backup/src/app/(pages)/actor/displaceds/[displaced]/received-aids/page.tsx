import { Suspense } from 'react';
import { Stack } from '@mantine/core';
import type { Metadata, ResolvingMetadata } from 'next';
import { getDisplacedProfile } from '@/actions/actors/displaced/profile/getDisplacedProfile';
import { getDisplacedReceivedAids } from '@/actions/actors/displaced/received-aids/getDisplacedReceivedAids';
import Displaced_Received_Aid_Content from '@/components/actors/displaced/received-aids/displaced-recived-aid-content';
import Displaced_Received_Aid_Header_Tabs from '@/components/actors/displaced/received-aids/displaced-received-aids-tabs';
import {
  DISPLACED_RECEIVED_AIDS_TABS,
  GET_DISPLACED_RECEIVED_AIDS_TABS,
} from '@/@types/actors/common-types/index.type';
import { FAVICON } from '@/assets/common';
import { APP_URL } from '@/constants/services';
import { DISPLACED_ROUTES_fUNC } from '@/constants/routes';

const FALLBACK = {
  TITLE: 'المساعدات للنازح | AL-AQSA Camp',
  DESCRIPTION: 'تفاصيل المساعدات المستلمة للنازحين على منصة مخيم الأقصى.',
  IMAGE: FAVICON.src,
};

interface Props {
  params: Promise<{ displaced: string }>;
  searchParams: Promise<{ 'received-aids-tab'?: DISPLACED_RECEIVED_AIDS_TABS }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { displaced } = await params;
  const displacedId = Number(displaced);
  const { 'received-aids-tab': tabParam } = await searchParams;
  const tab = tabParam || DISPLACED_RECEIVED_AIDS_TABS.RECEIVED_AIDS;

  const previousImages = (await parent)?.openGraph?.images || [];

  try {
    const profileResponse = await getDisplacedProfile({ displaced_Id: displacedId });
    const user = profileResponse?.status === 200 ? profileResponse.user : null;

    const aidsRes = await getDisplacedReceivedAids({
      displaced_Id: displacedId,
      page: 1,
      limit: 1,
      tab_type: tab,
    });
    const totalAids = aidsRes?.pagination?.total_items || 0;

    if (user) {
      const title =
        `${GET_DISPLACED_RECEIVED_AIDS_TABS[tab]}: ${user.name} | AL-AQSA Camp` || FALLBACK.TITLE;
      const description =
        `عرض ${totalAids} ${GET_DISPLACED_RECEIVED_AIDS_TABS[tab]} لـ ${user.name} في مخيم الأقصى` ||
        FALLBACK.DESCRIPTION;
      const image = user.profile_image || FALLBACK.IMAGE;

      return {
        title,
        description,
        metadataBase: new URL(APP_URL),
        openGraph: {
          siteName: 'AL-AQSA Camp',
          title,
          description,
          type: 'website',
          url: APP_URL + DISPLACED_ROUTES_fUNC({ displaced_Id: displacedId }).RECEIVED_AIDS,
          images: [
            { url: FAVICON.src, width: 600, height: 600, alt: 'Displaced Received Aid' },
            ...previousImages,
          ],
          locale: 'ar',
        },
        twitter: {
          card: 'summary',
          title,
          description,
          images: [image],
        },
      };
    }
  } catch {
    // fallback below
  }

  return {
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    metadataBase: new URL(APP_URL),
    openGraph: {
      siteName: 'AL-AQSA Camp',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      type: 'website',
      url: APP_URL + DISPLACED_ROUTES_fUNC({ displaced_Id: displacedId }).RECEIVED_AIDS,
      images: [
        { url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'AL-AQSA Camp' },
        ...previousImages,
      ],
      locale: 'ar',
    },
    twitter: {
      card: 'summary',
      title: FALLBACK.TITLE,
      description: FALLBACK.DESCRIPTION,
      images: [FALLBACK.IMAGE],
    },
  };
}

export default async function Displaced_Received_Aid({ params }: Props) {
  const { displaced } = await params;
  const displacedId = Number(displaced);

  return (
    <Stack justify='center' align='center' pt={20} w='100%' px={10}>
      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Received_Aid_Header_Tabs />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Displaced_Received_Aid_Content displaced_Id={displacedId} />
      </Suspense>
    </Stack>
  );
}
