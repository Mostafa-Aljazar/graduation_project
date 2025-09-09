import Displaceds_List from '@/components/actors/general/displaceds/content/displaceds-list';
import { Stack } from '@mantine/core';
import type { Metadata } from 'next';
import { getDisplaceds } from '@/actions/actors/general/displaceds/getDisplaceds';
import { APP_URL } from '@/constants/services';
import { GENERAL_ACTOR_ROUTES } from '@/constants/routes';
import { MAN } from '@/assets/actor';

const FALLBACK = {
  TITLE: 'قائمة النازحين | AL-AQSA Camp',
  DESCRIPTION:
    'عرض جميع النازحين المسجلين في منصة مخيم الأقصى مع بياناتهم وحالاتهم الاجتماعية والمعيشية.',
  IMAGE: MAN.src,
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await getDisplaceds({ page: 1, limit: 1 });
    const totalDisplaceds = response?.pagination?.total_items ?? 0;

    const title = `قائمة النازحين (${totalDisplaceds}) | AL-AQSA Camp`;
    const description = `عدد النازحين المسجلين: ${totalDisplaceds}. تصفح بيانات النازحين وحالاتهم في منصة مخيم الأقصى.`;

    return {
      title,
      description,
      metadataBase: new URL(APP_URL),
      openGraph: {
        siteName: 'AL-AQSA Camp',
        title,
        description,
        type: 'website',
        url: APP_URL + GENERAL_ACTOR_ROUTES.DISPLACEDS,
        images: [{ url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Displaceds' }],
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
        url: APP_URL + GENERAL_ACTOR_ROUTES.DISPLACEDS,
        images: [{ url: FALLBACK.IMAGE, width: 600, height: 600, alt: 'Displaceds' }],
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

export default function Displaceds() {
  return (
    <Stack p={10} pos='relative' w='100%'>
      <Displaceds_List />
    </Stack>
  );
}
